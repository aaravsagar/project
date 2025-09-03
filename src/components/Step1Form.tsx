import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RegistrationData } from '@/pages/Register';

interface Step1FormProps {
  data: RegistrationData;
  updateData: (data: Partial<RegistrationData>) => void;
}

export default function Step1Form({ data, updateData }: Step1FormProps) {
  const branches = [
    'Computer Engineering',
    'Information Technology',
    'Electronics & Communication',
    'Mechanical Engineering',
    'Civil Engineering',
    'Electrical Engineering'
  ];

  const semesters = ['1', '2', '3', '4', '5', '6'];

  const updateTeamLeader = (field: string, value: string) => {
    updateData({
      teamLeader: {
        ...data.teamLeader,
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Team Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
        <div>
          <Label htmlFor="teamName" className="text-sm font-medium">Team Name *</Label>
          <Input
            id="teamName"
            value={data.teamName}
            onChange={(e) => updateData({ teamName: e.target.value })}
            placeholder="Enter unique team name"
            className="mt-1 h-9 sm:h-10"
          />
        </div>
        
        <div>
          <Label htmlFor="psNumber" className="text-sm font-medium">Problem Statement Number *</Label>
          <Input
            id="psNumber"
            value={data.psNumber}
            onChange={(e) => updateData({ psNumber: e.target.value })}
            placeholder="e.g., PS001"
            className="mt-1 h-9 sm:h-10"
          />
        </div>
      </div>

      {/* Team Leader Details */}
      <div>
        <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-3 sm:mb-4 text-blue-900">Team Leader Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
          <div>
            <Label htmlFor="leaderName" className="text-sm font-medium">Full Name *</Label>
            <Input
              id="leaderName"
              value={data.teamLeader.name}
              onChange={(e) => updateTeamLeader('name', e.target.value)}
              placeholder="Enter full name"
              className="mt-1 h-9 sm:h-10"
            />
          </div>

          <div>
            <Label htmlFor="leaderEnrollment" className="text-sm font-medium">Enrollment Number *</Label>
            <p className="text-xs text-gray-500 mt-1 mb-1 leading-tight">
              Format: 244510316085 (1st sem students use roll number)
            </p>
            <Input
              id="leaderEnrollment"
              value={data.teamLeader.enrollmentNo}
              onChange={(e) => updateTeamLeader('enrollmentNo', e.target.value)}
              placeholder="e.g., 244510316085"
              className="mt-1 h-9 sm:h-10"
            />
          </div>

          <div>
            <Label htmlFor="leaderContact" className="text-sm font-medium">Contact Number *</Label>
            <Input
              id="leaderContact"
              value={data.teamLeader.contact}
              onChange={(e) => updateTeamLeader('contact', e.target.value)}
              placeholder="10-digit mobile number"
              className="mt-1 h-9 sm:h-10"
            />
          </div>

          <div>
            <Label htmlFor="leaderGender" className="text-sm font-medium">Gender *</Label>
            <Select
              value={data.teamLeader.gender}
              onValueChange={(value) => updateTeamLeader('gender', value)}
            >
              <SelectTrigger className="mt-1 h-9 sm:h-10">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="leaderEmail" className="text-sm font-medium">Email Address *</Label>
            <Input
              id="leaderEmail"
              type="email"
              value={data.teamLeader.email}
              onChange={(e) => updateTeamLeader('email', e.target.value)}
              placeholder="email@example.com"
              className="mt-1 h-9 sm:h-10"
            />
          </div>

          <div>
            <Label htmlFor="leaderBranch" className="text-sm font-medium">Branch *</Label>
            <Select
              value={data.teamLeader.branch}
              onValueChange={(value) => updateTeamLeader('branch', value)}
            >
              <SelectTrigger className="mt-1 h-9 sm:h-10">
                <SelectValue placeholder="Select branch" />
              </SelectTrigger>
              <SelectContent>
                {branches.map((branch) => (
                  <SelectItem key={branch} value={branch}>
                    {branch}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="leaderSemester" className="text-sm font-medium">Current Semester *</Label>
            <Select
              value={data.teamLeader.semester}
              onValueChange={(value) => updateTeamLeader('semester', value)}
            >
              <SelectTrigger className="mt-1 h-9 sm:h-10">
                <SelectValue placeholder="Select semester" />
              </SelectTrigger>
              <SelectContent>
                {semesters.map((sem) => (
                  <SelectItem key={sem} value={sem}>
                    Semester {sem}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}