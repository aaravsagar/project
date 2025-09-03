import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent } from '@/components/ui/card';
import { RegistrationData } from '@/pages/Register';
import { Users, Trophy, MapPin } from 'lucide-react';

interface Step3FormProps {
  data: RegistrationData;
  updateData: (data: Partial<RegistrationData>) => void;
}

export default function Step3Form({ data, updateData }: Step3FormProps) {
  // Calculate team statistics for summary
  const allMembers = [data.teamLeader, ...data.teamMembers];
  const femaleCount = allMembers.filter(member => member.gender === 'Female').length;
  const branchStats = allMembers.reduce((acc, member) => {
    if (member.branch) {
      acc[member.branch] = (acc[member.branch] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      {/* Team Summary */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
            <Trophy className="h-5 w-5 mr-2" />
            Team Summary
          </h3>
          
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-blue-600" />
              <span><strong>Team:</strong> {data.teamName || 'Not specified'}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-green-600" />
              <span><strong>PS Number:</strong> {data.psNumber || 'Not specified'}</span>
            </div>
            
            <div>
              <strong>Gender Balance:</strong> {femaleCount}/6 female members
              {femaleCount >= 1 ? (
                <span className="text-green-600 ml-1">✓</span>
              ) : (
                <span className="text-red-600 ml-1">⚠️ Need at least 1</span>
              )}
            </div>
          </div>

          <div className="mt-4">
            <strong className="text-sm">Branch Distribution:</strong>
            <div className="mt-2 flex flex-wrap gap-2">
              {Object.entries(branchStats).map(([branch, count]) => (
                <span 
                  key={branch}
                  className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                >
                  {branch}: {count}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Willingness Question */}
      <div>
        <Label className="text-base font-medium">
          Are you willing to participate in the National Event if your team is selected? *
        </Label>
        <p className="text-sm text-gray-600 mt-1 mb-4">
          Teams selected at the institutional level will compete at the national level.
        </p>
        
        <RadioGroup
          value={data.willingness}
          onValueChange={(value) => updateData({ willingness: value })}
          className="space-y-3"
        >
          <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
            <RadioGroupItem value="Yes" id="yes" />
            <Label htmlFor="yes" className="flex-1 cursor-pointer">
              <span className="font-medium text-green-700">Yes</span>
              <span className="block text-sm text-gray-600">
                We are committed to participating in the national event
              </span>
            </Label>
          </div>

          <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
            <RadioGroupItem value="Maybe" id="maybe" />
            <Label htmlFor="maybe" className="flex-1 cursor-pointer">
              <span className="font-medium text-yellow-700">Maybe</span>
              <span className="block text-sm text-gray-600">
                We need to discuss and confirm availability
              </span>
            </Label>
          </div>

          <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
            <RadioGroupItem value="No" id="no" />
            <Label htmlFor="no" className="flex-1 cursor-pointer">
              <span className="font-medium text-red-700">No</span>
              <span className="block text-sm text-gray-600">
                We prefer to participate only at the institutional level
              </span>
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Final Notes */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-yellow-800">
          <strong>Note:</strong> Please review all information carefully before submitting. 
          Once submitted, modifications will require contacting the organizing committee.
        </p>
      </div>
    </div>
  );
}