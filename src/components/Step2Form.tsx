import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RegistrationData, TeamMember } from '@/pages/Register';

interface Step2FormProps {
  data: RegistrationData;
  updateData: (data: Partial<RegistrationData>) => void;
}

export default function Step2Form({ data, updateData }: Step2FormProps) {
  const branches = [
    'Computer Engineering',
    'Information Technology',
    'Electronics & Communication',
    'Mechanical Engineering',
    'Civil Engineering',
    'Electrical Engineering'
  ];

  const semesters = ['1', '2', '3', '4', '5', '6'];

  const updateTeamMember = (index: number, field: keyof TeamMember, value: string) => {
    const updatedMembers = [...data.teamMembers];
    updatedMembers[index] = {
      ...updatedMembers[index],
      [field]: value
    };
    updateData({ teamMembers: updatedMembers });
  };

  const renderMemberForm = (index: number) => {
    const member = data.teamMembers[index];
    
    return (
      <Card key={index} className="mb-3 sm:mb-4 md:mb-6">
        <CardHeader>
          <CardTitle className="text-sm sm:text-base md:text-lg">Team Member {index + 2}</CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
            <div>
              <Label htmlFor={`member${index}Name`} className="text-sm font-medium">Full Name *</Label>
              <Input
                id={`member${index}Name`}
                value={member.name}
                onChange={(e) => updateTeamMember(index, 'name', e.target.value)}
                placeholder="Enter full name"
                className="mt-1 h-9 sm:h-10"
              />
            </div>

            <div>
              <Label htmlFor={`member${index}Enrollment`} className="text-sm font-medium">Enrollment Number *</Label>
              <p className="text-xs text-gray-500 mt-1 mb-1 leading-tight hidden sm:block">
                Format: 244510316085 (1st sem students use roll number)
              </p>
              <Input
                id={`member${index}Enrollment`}
                value={member.enrollmentNo}
                onChange={(e) => updateTeamMember(index, 'enrollmentNo', e.target.value)}
                placeholder="e.g., 244510316085"
                className="mt-1 h-9 sm:h-10"
              />
            </div>

            <div>
              <Label htmlFor={`member${index}Contact`} className="text-sm font-medium">Contact Number *</Label>
              <Input
                id={`member${index}Contact`}
                value={member.contact}
                onChange={(e) => updateTeamMember(index, 'contact', e.target.value)}
                placeholder="10-digit mobile number"
                className="mt-1 h-9 sm:h-10"
              />
            </div>

            <div>
              <Label htmlFor={`member${index}Gender`} className="text-sm font-medium">Gender *</Label>
              <Select
                value={member.gender}
                onValueChange={(value) => updateTeamMember(index, 'gender', value)}
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
              <Label htmlFor={`member${index}Email`} className="text-sm font-medium">Email Address *</Label>
              <Input
                id={`member${index}Email`}
                type="email"
                value={member.email}
                onChange={(e) => updateTeamMember(index, 'email', e.target.value)}
                placeholder="email@example.com"
                className="mt-1 h-9 sm:h-10"
              />
            </div>

            <div>
              <Label htmlFor={`member${index}Branch`} className="text-sm font-medium">Branch *</Label>
              <Select
                value={member.branch}
                onValueChange={(value) => updateTeamMember(index, 'branch', value)}
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
              <Label htmlFor={`member${index}Semester`} className="text-sm font-medium">Current Semester *</Label>
              <Select
                value={member.semester}
                onValueChange={(value) => updateTeamMember(index, 'semester', value)}
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
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
        <p className="text-xs sm:text-sm text-blue-800 leading-relaxed">
          <strong>Important:</strong> Please fill details for all 5 team members. 
          At least 1 female member is compulsory, 2 are recommended.
        </p>
      </div>

      {[0, 1, 2, 3, 4].map(renderMemberForm)}
    </div>
  );
}