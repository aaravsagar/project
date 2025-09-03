import * as XLSX from 'xlsx';

interface Registration {
  id: string;
  teamName: string;
  psNumber: string;
  teamLeader: {
    name: string;
    enrollmentNo: string;
    contact: string;
    email: string;
    branch: string;
    semester: string;
    gender: string;
  };
  teamMembers: Array<{
    name: string;
    enrollmentNo: string;
    contact: string;
    email: string;
    branch: string;
    semester: string;
    gender: string;
  }>;
  willingness: string;
  submittedAt: string;
  teamStats: {
    totalMembers: number;
    femaleMembers: number;
    branches: Record<string, number>;
  };
}

/**
 * Export registrations data to Excel file
 * @param registrations - Array of registration data
 */
export async function exportToExcel(registrations: Registration[]): Promise<void> {
  try {
    // Create workbook
    const workbook = XLSX.utils.book_new();

    // Sheet 1: Team Summary
    const teamSummaryData = registrations.map((reg, index) => ({
      'S.No': index + 1,
      'Team Name': reg.teamName,
      'PS Number': reg.psNumber,
      'Team Leader': reg.teamLeader.name,
      'Leader Enrollment': reg.teamLeader.enrollmentNo,
      'Leader Contact': reg.teamLeader.contact,
      'Leader Email': reg.teamLeader.email,
      'Leader Branch': reg.teamLeader.branch,
      'Leader Semester': reg.teamLeader.semester,
      'Female Members': reg.teamStats.femaleMembers,
      'National Willingness': reg.willingness,
      'Submission Date': new Date(reg.submittedAt).toLocaleDateString(),
      'Submission Time': new Date(reg.submittedAt).toLocaleTimeString()
    }));

    const teamSummarySheet = XLSX.utils.json_to_sheet(teamSummaryData);
    XLSX.utils.book_append_sheet(workbook, teamSummarySheet, 'Team Summary');

    // Sheet 2: All Members Details
    const allMembersData: any[] = [];
    
    registrations.forEach((reg) => {
      // Add team leader
      allMembersData.push({
        'Team Name': reg.teamName,
        'PS Number': reg.psNumber,
        'Role': 'Team Leader',
        'Name': reg.teamLeader.name,
        'Enrollment Number': reg.teamLeader.enrollmentNo,
        'Contact': reg.teamLeader.contact,
        'Email': reg.teamLeader.email,
        'Gender': reg.teamLeader.gender,
        'Branch': reg.teamLeader.branch,
        'Semester': reg.teamLeader.semester,
        'Submission Date': new Date(reg.submittedAt).toLocaleDateString()
      });

      // Add team members
      reg.teamMembers.forEach((member, index) => {
        if (member.name) { // Only add filled members
          allMembersData.push({
            'Team Name': reg.teamName,
            'PS Number': reg.psNumber,
            'Role': `Member ${index + 1}`,
            'Name': member.name,
            'Enrollment Number': member.enrollmentNo,
            'Contact': member.contact,
            'Email': member.email,
            'Gender': member.gender,
            'Branch': member.branch,
            'Semester': member.semester,
            'Submission Date': new Date(reg.submittedAt).toLocaleDateString()
          });
        }
      });
    });

    const allMembersSheet = XLSX.utils.json_to_sheet(allMembersData);
    XLSX.utils.book_append_sheet(workbook, allMembersSheet, 'All Members');

    // Sheet 3: Statistics
    const branchStats: Record<string, number> = {};
    const semesterStats: Record<string, number> = {};
    let totalFemale = 0;
    let totalMale = 0;

    registrations.forEach((reg) => {
      const allMembers = [reg.teamLeader, ...reg.teamMembers.filter(m => m.name)];
      
      allMembers.forEach((member) => {
        // Branch statistics
        if (member.branch) {
          branchStats[member.branch] = (branchStats[member.branch] || 0) + 1;
        }
        
        // Semester statistics
        if (member.semester) {
          const semKey = `Semester ${member.semester}`;
          semesterStats[semKey] = (semesterStats[semKey] || 0) + 1;
        }
        
        // Gender statistics
        if (member.gender === 'Female') totalFemale++;
        else if (member.gender === 'Male') totalMale++;
      });
    });

    const statsData = [
      { 'Metric': 'Total Teams', 'Value': registrations.length },
      { 'Metric': 'Total Participants', 'Value': registrations.length * 6 },
      { 'Metric': 'Female Participants', 'Value': totalFemale },
      { 'Metric': 'Male Participants', 'Value': totalMale },
      { 'Metric': 'Teams Willing for National', 'Value': registrations.filter(r => r.willingness === 'Yes').length },
      { 'Metric': '', 'Value': '' }, // Empty row
      { 'Metric': 'BRANCH WISE DISTRIBUTION', 'Value': '' },
      ...Object.entries(branchStats).map(([branch, count]) => ({
        'Metric': branch,
        'Value': count
      })),
      { 'Metric': '', 'Value': '' }, // Empty row
      { 'Metric': 'SEMESTER WISE DISTRIBUTION', 'Value': '' },
      ...Object.entries(semesterStats).map(([semester, count]) => ({
        'Metric': semester,
        'Value': count
      }))
    ];

    const statsSheet = XLSX.utils.json_to_sheet(statsData);
    XLSX.utils.book_append_sheet(workbook, statsSheet, 'Statistics');

    // Generate filename with current date
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '-');
    const filename = `SIH_2025_Registrations_${dateStr}_${timeStr}.xlsx`;

    // Download file
    XLSX.writeFile(workbook, filename);
  } catch (error) {
    console.error('Error creating Excel file:', error);
    throw new Error('Failed to create Excel file');
  }
}