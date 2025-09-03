import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Step1Form from '@/components/Step1Form';
import Step2Form from '@/components/Step2Form';
import Step3Form from '@/components/Step3Form';
import { submitRegistration, checkTeamNameExists } from '@/lib/firebase';
import { toast } from 'sonner';

export interface TeamMember {
  name: string;
  enrollmentNo: string;
  contact: string;
  gender: string;
  email: string;
  branch: string;
  semester: string;
}

export interface RegistrationData {
  teamName: string;
  psNumber: string;
  teamLeader: TeamMember;
  teamMembers: TeamMember[];
  willingness: string;
}

const initialMember: TeamMember = {
  name: '',
  enrollmentNo: '',
  contact: '',
  gender: '',
  email: '',
  branch: '',
  semester: ''
};

const initialData: RegistrationData = {
  teamName: '',
  psNumber: '',
  teamLeader: { ...initialMember },
  teamMembers: Array(5).fill(null).map(() => ({ ...initialMember })),
  willingness: ''
};

export default function Register() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<RegistrationData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('sih-registration-data');
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData));
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  // Save to localStorage whenever formData changes
  useEffect(() => {
    localStorage.setItem('sih-registration-data', JSON.stringify(formData));
  }, [formData]);

  const updateFormData = (data: Partial<RegistrationData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const validateStep1 = () => {
    const { teamName, psNumber, teamLeader } = formData;
    if (!teamName.trim() || !psNumber.trim()) return false;
    
    const leader = teamLeader;
    return leader.name && leader.enrollmentNo && leader.contact && 
           leader.gender && leader.email && leader.branch && leader.semester;
  };

  const validateStep2 = () => {
    const filledMembers = formData.teamMembers.filter(member => 
      member.name && member.enrollmentNo && member.contact && 
      member.gender && member.email && member.branch && member.semester
    );
    
    if (filledMembers.length !== 5) {
      toast.error('All 5 team members must be filled');
      return false;
    }

    // Check gender balance
    const allMembers = [formData.teamLeader, ...formData.teamMembers];
    const femaleCount = allMembers.filter(member => member.gender === 'Female').length;
    
    if (femaleCount < 1) {
      toast.error('At least 1 female member is compulsory');
      return false;
    }

    if (femaleCount < 2) {
      toast.warning('2 female members are recommended for better team balance');
    }

    return true;
  };

  const validateStep3 = () => {
    return formData.willingness !== '';
  };

  const nextStep = async () => {
    if (currentStep === 1 && !validateStep1()) {
      toast.error('Please fill all required fields in Step 1');
      return;
    }

    // Check team name uniqueness before moving to step 2
    if (currentStep === 1) {
      try {
        const exists = await checkTeamNameExists(formData.teamName);
        if (exists) {
          toast.error('Team name already exists. Please choose a different name.');
          return;
        }
      } catch (error) {
        console.error('Error checking team name:', error);
        toast.error('Error validating team name. Please try again.');
        return;
      }
    }

    if (currentStep === 2 && !validateStep2()) {
      return;
    }

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep3()) {
      toast.error('Please select your willingness to participate');
      return;
    }

    setIsSubmitting(true);
    try {
      await submitRegistration(formData);
      toast.success('Registration submitted successfully!');
      
      // Clear localStorage after successful submission
      localStorage.removeItem('sih-registration-data');
      setFormData(initialData);
      setCurrentStep(1);
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Failed to submit registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepTitles = ['Team Details', 'Team Members', 'Final Details'];
  const progress = (currentStep / 3) * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            SIH 2025 Team Registration
          </h1>
          <p className="text-gray-600">Complete all steps to register your team</p>
        </div>

        {/* Progress Indicator */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              {stepTitles.map((title, index) => (
                <div 
                  key={index}
                  className={`flex items-center ${index < stepTitles.length - 1 ? 'flex-1' : ''}`}
                >
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      currentStep > index + 1 
                        ? 'bg-green-500 text-white' 
                        : currentStep === index + 1 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    currentStep >= index + 1 ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {title}
                  </span>
                  {index < stepTitles.length - 1 && (
                    <div className="flex-1 mx-4">
                      <div className={`h-1 rounded ${
                        currentStep > index + 1 ? 'bg-green-500' : 'bg-gray-200'
                      }`}></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <Progress value={progress} className="w-full" />
          </CardContent>
        </Card>

        {/* Form Steps */}
        <Card>
          <CardHeader>
            <CardTitle>Step {currentStep}: {stepTitles[currentStep - 1]}</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {currentStep === 1 && (
              <Step1Form 
                data={formData} 
                updateData={updateFormData} 
              />
            )}
            {currentStep === 2 && (
              <Step2Form 
                data={formData} 
                updateData={updateFormData} 
              />
            )}
            {currentStep === 3 && (
              <Step3Form 
                data={formData} 
                updateData={updateFormData} 
              />
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center space-x-2"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
              </Button>

              {currentStep < 3 ? (
                <Button
                  onClick={nextStep}
                  className="flex items-center space-x-2"
                >
                  <span>Next</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Registration'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}