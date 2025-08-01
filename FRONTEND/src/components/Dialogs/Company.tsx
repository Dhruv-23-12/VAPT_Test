import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Building2, User, Calendar, Image, X } from 'lucide-react';

interface CompanyFormData {
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
  numberOfEmployees: string;
  logo: File | null;
}

interface CompanyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CompanyFormData) => void;
  initialData?: Partial<CompanyFormData>;
  mode?: 'create' | 'edit';
}

export function CompanyDialog({ 
  open, 
  onOpenChange, 
  onSubmit, 
  initialData = {}, 
  mode = 'create' 
}: CompanyDialogProps) {
  const [form, setForm] = useState<CompanyFormData>({
    companyName: '',
    companyEmail: '',
    phoneNumber: '',
    industry: '',
    website: '',
    companyAddress: '',
    adminUserName: '',
    adminEmail: '',
    subscriptionPlan: '',
    status: 'Active',
    numberOfEmployees: '',
    logo: null,
    ...initialData
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    // Reset form after submission
    setForm({
      companyName: '',
      companyEmail: '',
      phoneNumber: '',
      industry: '',
      website: '',
      companyAddress: '',
      adminUserName: '',
      adminEmail: '',
      subscriptionPlan: '',
      status: 'Active',
      numberOfEmployees: '',
      logo: null,
    });
    onOpenChange(false);
  };

  const handleCancel = () => {
    setForm({
      companyName: '',
      companyEmail: '',
      phoneNumber: '',
      industry: '',
      website: '',
      companyAddress: '',
      adminUserName: '',
      adminEmail: '',
      subscriptionPlan: '',
      status: 'Active',
      numberOfEmployees: '',
      logo: null,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            {mode === 'create' ? 'Add New Company' : 'Edit Company'}
          </DialogTitle>
          <p className="text-gray-600 mt-2">
            {mode === 'create' 
              ? 'Enter company information and admin details' 
              : 'Update company information and admin details'
            }
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Company Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              Company Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  placeholder="Legal or registered name of the company"
                  value={form.companyName}
                  onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyEmail">Company Email *</Label>
                <Input
                  id="companyEmail"
                  type="email"
                  placeholder="Admin or official contact email"
                  value={form.companyEmail}
                  onChange={(e) => setForm({ ...form, companyEmail: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number *</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="Company's primary contact number"
                  value={form.phoneNumber}
                  onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry">Industry *</Label>
                <Select value={form.industry} onValueChange={(value) => setForm({ ...form, industry: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="IT">IT</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                    <SelectItem value="Retail">Retail</SelectItem>
                    <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Government">Government</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  type="url"
                  placeholder="https://company.com"
                  value={form.website}
                  onChange={(e) => setForm({ ...form, website: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="numberOfEmployees">No. of Employees *</Label>
                <Select value={form.numberOfEmployees} onValueChange={(value) => setForm({ ...form, numberOfEmployees: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1-10</SelectItem>
                    <SelectItem value="11-50">11-50</SelectItem>
                    <SelectItem value="51-100">51-100</SelectItem>
                    <SelectItem value="101-250">101-250</SelectItem>
                    <SelectItem value="251-500">251-500</SelectItem>
                    <SelectItem value="500+">500+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyAddress">Company Address *</Label>
              <Textarea
                id="companyAddress"
                placeholder="Full address for regional compliance and audits"
                value={form.companyAddress}
                onChange={(e) => setForm({ ...form, companyAddress: e.target.value })}
                required
                rows={3}
              />
            </div>
          </div>

          {/* Admin Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <User className="w-5 h-5" />
              Admin Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="adminUserName">Admin User Name *</Label>
                <Input
                  id="adminUserName"
                  placeholder="Primary contact person or account owner"
                  value={form.adminUserName}
                  onChange={(e) => setForm({ ...form, adminUserName: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="adminEmail">Admin Email *</Label>
                <Input
                  id="adminEmail"
                  type="email"
                  placeholder="Email of the admin user"
                  value={form.adminEmail}
                  onChange={(e) => setForm({ ...form, adminEmail: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>

          {/* Subscription Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Subscription Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="subscriptionPlan">Subscription Plan *</Label>
                <Select value={form.subscriptionPlan} onValueChange={(value) => setForm({ ...form, subscriptionPlan: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select VAPT service level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Basic">Basic</SelectItem>
                    <SelectItem value="Professional">Professional</SelectItem>
                    <SelectItem value="Enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status *</Label>
                <Select value={form.status} onValueChange={(value) => setForm({ ...form, status: value as 'Active' | 'Inactive' | 'Suspended' })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Logo Upload Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Image className="w-5 h-5" />
              Company Logo
            </h3>
            
            <div className="space-y-2">
              <Label htmlFor="logo">Company Logo (Optional)</Label>
              <Input
                id="logo"
                type="file"
                accept="image/*"
                onChange={(e) => setForm({ ...form, logo: e.target.files ? e.target.files[0] : null })}
              />
              <p className="text-sm text-gray-500">Upload company branding/logo image</p>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-teal-600 hover:bg-teal-700">
              {mode === 'create' ? 'Create Company' : 'Update Company'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}