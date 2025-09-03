import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download, Users, Trophy, Calendar, FileSpreadsheet, Eye, Globe } from 'lucide-react';
import { getAllRegistrations } from '@/lib/firebase';
import { exportToExcel } from '@/lib/excel';
import { toast } from 'sonner';
import TeamDetailsModal from '@/components/TeamDetailsModal';

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
  ipAddress?: string;
  userAgent?: string;
  teamStats: {
    totalMembers: number;
    femaleMembers: number;
    branches: Record<string, number>;
  };
}

export default function Admin() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadRegistrations();
  }, []);

  const loadRegistrations = async () => {
    try {
      setLoading(true);
      const data = await getAllRegistrations();
      setRegistrations(data);
    } catch (error) {
      console.error('Error loading registrations:', error);
      toast.error('Failed to load registrations');
    } finally {
      setLoading(false);
    }
  };

  const handleExportToExcel = async () => {
    try {
      setExporting(true);
      await exportToExcel(registrations);
      toast.success('Excel file downloaded successfully!');
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      toast.error('Failed to export data');
    } finally {
      setExporting(false);
    }
  };

  const handleViewDetails = (registration: Registration) => {
    setSelectedRegistration(registration);
    setIsModalOpen(true);
  };

  const getWillingnessColor = (willingness: string) => {
    switch (willingness) {
      case 'Yes': return 'bg-green-100 text-green-800';
      case 'Maybe': return 'bg-yellow-100 text-yellow-800';
      case 'No': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading registrations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-2 sm:py-4 md:py-8">
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        {/* Header */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
                SIH 2025 Admin Dashboard
              </h1>
              <p className="text-xs sm:text-sm md:text-base text-gray-600">
                Manage team registrations and export data
              </p>
            </div>
            <Button
              onClick={handleExportToExcel}
              disabled={exporting || registrations.length === 0}
              className="bg-green-600 hover:bg-green-700 flex items-center space-x-2 w-full sm:w-auto text-sm"
            >
              {exporting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Exporting...</span>
                </>
              ) : (
                <>
                  <FileSpreadsheet className="h-4 w-4" />
                  <span>Export to Excel</span>
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-8">
          <Card>
            <CardContent className="p-3 sm:p-4 md:p-6">
              <div className="flex items-center">
                <Trophy className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-yellow-600 flex-shrink-0" />
                <div className="ml-2 sm:ml-3 md:ml-4 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Total Teams</p>
                  <p className="text-base sm:text-lg md:text-2xl font-bold text-gray-900">{registrations.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3 sm:p-4 md:p-6">
              <div className="flex items-center">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-blue-600 flex-shrink-0" />
                <div className="ml-2 sm:ml-3 md:ml-4 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Participants</p>
                  <p className="text-base sm:text-lg md:text-2xl font-bold text-gray-900">{registrations.length * 6}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3 sm:p-4 md:p-6">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-green-600 flex-shrink-0" />
                <div className="ml-2 sm:ml-3 md:ml-4 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">National</p>
                  <p className="text-base sm:text-lg md:text-2xl font-bold text-gray-900">
                    {registrations.filter(r => r.willingness === 'Yes').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3 sm:p-4 md:p-6">
              <div className="flex items-center">
                <Download className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-purple-600 flex-shrink-0" />
                <div className="ml-2 sm:ml-3 md:ml-4 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Female</p>
                  <p className="text-base sm:text-lg md:text-2xl font-bold text-gray-900">
                    {registrations.reduce((sum, r) => sum + r.teamStats.femaleMembers, 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Registrations Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-base sm:text-lg md:text-xl">
              <Users className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Team Registrations</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {registrations.length === 0 ? (
              <div className="text-center py-6 sm:py-8 px-4">
                <Users className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
                <p className="text-sm sm:text-base text-gray-600">No registrations yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto -mx-2 sm:-mx-4 md:mx-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[100px] text-xs sm:text-sm">Team</TableHead>
                      <TableHead className="min-w-[60px] text-xs sm:text-sm">PS</TableHead>
                      <TableHead className="min-w-[120px] text-xs sm:text-sm">Leader</TableHead>
                      <TableHead className="min-w-[100px] hidden md:table-cell text-xs sm:text-sm">Contact</TableHead>
                      <TableHead className="min-w-[60px] text-xs sm:text-sm">Female</TableHead>
                      <TableHead className="min-w-[80px] hidden lg:table-cell text-xs sm:text-sm">Willing</TableHead>
                      <TableHead className="min-w-[80px] hidden xl:table-cell text-xs sm:text-sm">IP</TableHead>
                      <TableHead className="min-w-[70px] hidden sm:table-cell text-xs sm:text-sm">Date</TableHead>
                      <TableHead className="min-w-[60px] text-xs sm:text-sm">View</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {registrations.map((registration) => (
                      <TableRow key={registration.id}>
                        <TableCell className="font-medium text-xs sm:text-sm">
                          <div className="max-w-[100px] sm:max-w-[150px] truncate" title={registration.teamName}>
                            {registration.teamName}
                          </div>
                        </TableCell>
                        <TableCell className="text-xs sm:text-sm font-mono">{registration.psNumber}</TableCell>
                        <TableCell className="text-xs sm:text-sm">
                          <div>
                            <p className="font-medium truncate max-w-[100px] sm:max-w-[120px]" title={registration.teamLeader.name}>
                              {registration.teamLeader.name}
                            </p>
                            <p className="text-xs text-gray-600 font-mono truncate">
                              {registration.teamLeader.enrollmentNo}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-xs sm:text-sm">
                          <div>
                            <p className="text-xs font-mono">{registration.teamLeader.contact}</p>
                            <p className="text-xs text-gray-600 break-all max-w-[120px] truncate" title={registration.teamLeader.email}>
                              {registration.teamLeader.email}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={registration.teamStats.femaleMembers >= 2 ? "default" : "secondary"}
                            className="text-xs px-1 sm:px-2"
                          >
                            {registration.teamStats.femaleMembers}/6
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <Badge className={`${getWillingnessColor(registration.willingness)} text-xs px-1 sm:px-2`}>
                            <span className="hidden xl:inline">{registration.willingness}</span>
                            <span className="xl:hidden">
                              {registration.willingness === 'Yes' ? 'Y' : registration.willingness === 'No' ? 'N' : 'M'}
                            </span>
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden xl:table-cell text-xs">
                          <div className="flex items-center space-x-1">
                            <Globe className="h-3 w-3 text-gray-400" />
                            <span className="font-mono truncate max-w-[80px]" title={registration.ipAddress || 'Unknown'}>
                              {registration.ipAddress || 'Unknown'}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell text-xs text-gray-600">
                          <div className="max-w-[70px] truncate">
                            {new Date(registration.submittedAt).toLocaleDateString('en-GB', {
                              day: '2-digit',
                              month: '2-digit'
                            })}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm" 
                            onClick={() => handleViewDetails(registration)}
                            className="flex items-center space-x-1 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
                          >
                            <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span className="hidden sm:inline">Details</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="mt-4 sm:mt-6 md:mt-8 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
          <Button
            variant="outline"
            onClick={loadRegistrations}
            className="w-full sm:w-auto text-sm"
          >
            Refresh Data
          </Button>
          <Button
            onClick={() => window.location.href = '/'}
            variant="outline"
            className="w-full sm:w-auto text-sm"
          >
            Back to Home
          </Button>
        </div>

        {/* Team Details Modal */}
        <TeamDetailsModal
          registration={selectedRegistration}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedRegistration(null);
          }}
        />
      </div>
    </div>
  );
}