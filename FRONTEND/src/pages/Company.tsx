import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MoreHorizontal} from 'lucide-react';
import { CompanyDialog } from '@/components/Dialogs/Company';

interface Company {
  id: string;
  companyName: string;
  companyEmail: string;
  phoneNumber: string;
  industry: string;
  website: string;
  companyAddress: string;
  adminUserName: string;
  adminEmail: string;
  subscriptionPlan: string;
  status: 'Active' | 'Inactive' | 'Suspended';
  signupDate: string;
  numberOfEmployees: string;
  logo?: string;
}

const mockCompanies: Company[] = [
  {
    id: 'CMP001',
    companyName: 'TechCorp Solutions',
    companyEmail: 'admin@techcorp.com',
    phoneNumber: '+1 (555) 123-4567',
    industry: 'Technology',
    website: 'https://techcorp.com',
    companyAddress: '123 Innovation Drive, San Francisco, CA 94105',
    adminUserName: 'John Smith',
    adminEmail: 'john.smith@techcorp.com',
    subscriptionPlan: 'Enterprise',
    status: 'Active',
    signupDate: '2024-01-15',
    numberOfEmployees: '250-500'
  },
  {
    id: 'CMP002',
    companyName: 'FinanceFirst Bank',
    companyEmail: 'security@financefirst.com',
    phoneNumber: '+1 (555) 987-6543',
    industry: 'Finance',
    website: 'https://financefirst.com',
    companyAddress: '456 Wall Street, New York, NY 10005',
    adminUserName: 'Sarah Johnson',
    adminEmail: 'sarah.johnson@financefirst.com',
    subscriptionPlan: 'Professional',
    status: 'Active',
    signupDate: '2024-02-20',
    numberOfEmployees: '100-250'
  },
  {
    id: 'CMP003',
    companyName: 'HealthCare Plus',
    companyEmail: 'it@healthcareplus.com',
    phoneNumber: '+1 (555) 456-7890',
    industry: 'Healthcare',
    website: 'https://healthcareplus.com',
    companyAddress: '789 Medical Center Blvd, Boston, MA 02115',
    adminUserName: 'Mike Chen',
    adminEmail: 'mike.chen@healthcareplus.com',
    subscriptionPlan: 'Basic',
    status: 'Inactive',
    signupDate: '2024-03-10',
    numberOfEmployees: '50-100'
  }
];

export default function Company() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [planFilter, setPlanFilter] = useState('all');
  const [showDialog, setShowDialog] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
      case 'Inactive':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Inactive</Badge>;
      case 'Suspended':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Suspended</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filteredCompanies = mockCompanies.filter(company => {
    const matchesSearch = company.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.adminUserName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.companyEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || company.status === statusFilter;
    const matchesPlan = planFilter === 'all' || company.subscriptionPlan === planFilter;
    
    return matchesSearch && matchesStatus && matchesPlan;
  });

  const handleCompanySubmit = (data: any) => {
    console.log('New company data:', data);
    // Handle company creation/update here
    // You can add API calls or state updates here
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Company Management</h1>
          <p className="text-gray-600">Manage company accounts and subscriptions</p>
        </div>
        <Button className="bg-teal-600 hover:bg-teal-700" onClick={() => setShowDialog(true)}>
          Add New Company
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
              <SelectItem value="Suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>

          <Select value={planFilter} onValueChange={setPlanFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filter by plan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Plans</SelectItem>
              <SelectItem value="Basic">Basic</SelectItem>
              <SelectItem value="Professional">Professional</SelectItem>
              <SelectItem value="Enterprise">Enterprise</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Companies Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left p-4 font-semibold text-gray-900">Company ID</th>
                <th className="text-left p-4 font-semibold text-gray-900">Company Name</th>
                <th className="text-left p-4 font-semibold text-gray-900">Admin User</th>
                <th className="text-left p-4 font-semibold text-gray-900">Industry</th>
                <th className="text-left p-4 font-semibold text-gray-900">Plan</th>
                <th className="text-left p-4 font-semibold text-gray-900">Status</th>
                <th className="text-left p-4 font-semibold text-gray-900">Signup Date</th>
                <th className="text-left p-4 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCompanies.map((company) => (
                <tr key={company.id} className="hover:bg-gray-50 border-b border-gray-100">
                  <td className="p-4 font-mono text-sm text-gray-600">{company.id}</td>
                  <td className="p-4 font-medium text-gray-900">{company.companyName}</td>
                  <td className="p-4 text-gray-600">{company.adminUserName}</td>
                  <td className="p-4 text-gray-600">{company.industry}</td>
                  <td className="p-4">
                    <Badge variant="outline">{company.subscriptionPlan}</Badge>
                  </td>
                  <td className="p-4">{getStatusBadge(company.status)}</td>
                  <td className="p-4 text-gray-600">{company.signupDate}</td>
                  <td className="p-4">
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-sm text-gray-500">
        Showing {filteredCompanies.length} of {mockCompanies.length} companies
      </div>

      {/* Company Dialog */}
      <CompanyDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        onSubmit={handleCompanySubmit}
        mode="create"
      />
    </div>
  );
}