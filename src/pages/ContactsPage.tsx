import React, { useState, useEffect } from 'react';
import { Users, Plus, Search, Filter, Eye, CreditCard as Edit, Trash2, Phone, Mail, MessageSquare, ArrowLeft } from 'lucide-react';
import { getAuthHeaders } from '../services/headers';
import { ENDPOINTS } from '../services/endpoints';

interface Contact {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  gender: 'Male' | 'Female';
  state: string;
  district: string;
  preferredContact: 'Phone' | 'Email' | 'WhatsApp';
}

interface AddContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  mobileNo: string;
  userName: string;
  password: string;
  roleId: number;
  stateId: number;
  districtId: number;
  gender: string;
  dateOfBirth: string;
  district: string;
  address: string;
  preferredContactMethod: string;
}

const ContactsPage: React.FC = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('All States');
  const [selectedGender, setSelectedGender] = useState('All Genders');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Mock contacts data matching the image
  const [contacts] = useState<Contact[]>([
    {
      id: '1',
      name: 'Rajesh Kumar',
      phoneNumber: '+91 98765 43210',
      email: 'rajesh.kumar@email.com',
      gender: 'Male',
      state: 'Delhi',
      district: 'New Delhi',
      preferredContact: 'Phone'
    },
    {
      id: '2',
      name: 'Priya Sharma',
      phoneNumber: '+91 87654 32109',
      email: 'priya.sharma@email.com',
      gender: 'Female',
      state: 'Maharashtra',
      district: 'Mumbai',
      preferredContact: 'Email'
    },
    {
      id: '3',
      name: 'Amit Singh',
      phoneNumber: '+91 76543 21098',
      email: 'amit.singh@email.com',
      gender: 'Male',
      state: 'Karnataka',
      district: 'Bangalore',
      preferredContact: 'WhatsApp'
    }
  ]);

  const [formData, setFormData] = useState<AddContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    mobileNo: '',
    userName: '',
    password: '',
    roleId: 1,
    stateId: 100,
    districtId: 1000,
    gender: '',
    dateOfBirth: '',
    district: '',
    address: '',
    preferredContactMethod: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const payload = {
        roleId: formData.roleId,
        stateId: formData.stateId,
        districtId: formData.districtId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        mobileNo: formData.mobileNo,
        userName: formData.userName,
        password: formData.password
      };

      const headers = getAuthHeaders();
      console.log('Add Contact Headers:', headers);
      console.log('Add Contact Payload:', payload);

      const response = await fetch(`${ENDPOINTS.BASE_URL}/hpcyber-users/api/user/v1/register`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errorMessage = errorData?.message || `Failed to add contact: ${response.status}`;
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log('Add Contact Response:', data);

      if (data.statusCode === 'ESS-000' || data.success) {
        setSuccess('Contact added successfully!');
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          mobileNo: '',
          userName: '',
          password: '',
          roleId: 1,
          stateId: 100,
          districtId: 1000,
          gender: '',
          dateOfBirth: '',
          district: '',
          address: '',
          preferredContactMethod: ''
        });
        
        // Close form after 2 seconds
        setTimeout(() => {
          setShowAddForm(false);
          setSuccess('');
        }, 2000);
      } else {
        throw new Error(data.message || 'Failed to add contact');
      }
    } catch (err) {
      console.error('Add Contact Error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to add contact. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesState = selectedState === 'All States' || contact.state === selectedState;
    const matchesGender = selectedGender === 'All Genders' || contact.gender === selectedGender;
    
    return matchesSearch && matchesState && matchesGender;
  });

  const getPreferredContactIcon = (method: string) => {
    switch (method) {
      case 'Phone':
        return <Phone className="h-4 w-4" />;
      case 'Email':
        return <Mail className="h-4 w-4" />;
      case 'WhatsApp':
        return <MessageSquare className="h-4 w-4" />;
      default:
        return <Phone className="h-4 w-4" />;
    }
  };

  const getPreferredContactColor = (method: string) => {
    switch (method) {
      case 'Phone':
        return 'bg-blue-600 text-white';
      case 'Email':
        return 'bg-gray-600 text-white';
      case 'WhatsApp':
        return 'bg-green-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  if (showAddForm) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowAddForm(false)}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Add New Contact</h1>
            <p className="text-gray-600">Create a new contact record</p>
          </div>
        </div>

        {/* Add Contact Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Contact Information</h3>
          
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3 flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <span className="text-sm text-red-700">{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-3 flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span className="text-sm text-green-700">{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  required
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={isLoading}
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  required
                  placeholder="Enter last name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={isLoading}
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="mobileNo"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.mobileNo}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={isLoading}
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="email@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={isLoading}
                />
              </div>

              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="userName"
                  required
                  placeholder="Enter username"
                  value={formData.userName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={isLoading}
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={isLoading}
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  name="gender"
                  required
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={isLoading}
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={isLoading}
                />
              </div>

              {/* State */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State <span className="text-red-500">*</span>
                </label>
                <select
                  name="stateId"
                  required
                  value={formData.stateId}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={isLoading}
                >
                  <option value={100}>Himachal Pradesh</option>
                  <option value={101}>Delhi</option>
                  <option value={102}>Maharashtra</option>
                  <option value={103}>Karnataka</option>
                </select>
              </div>

              {/* District */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  District
                </label>
                <input
                  type="text"
                  name="district"
                  placeholder="Enter district"
                  value={formData.district}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={isLoading}
                />
              </div>

              {/* Preferred Contact Method */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Contact Method <span className="text-red-500">*</span>
                </label>
                <select
                  name="preferredContactMethod"
                  required
                  value={formData.preferredContactMethod}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={isLoading}
                >
                  <option value="">Select contact method</option>
                  <option value="Phone">Phone</option>
                  <option value="Email">Email</option>
                  <option value="WhatsApp">WhatsApp</option>
                </select>
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <textarea
                name="address"
                rows={3}
                placeholder="Enter full address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={isLoading}
              />
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Creating...</span>
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    <span>Create Contact</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Contact Management</h1>
            <p className="text-gray-600">Manage customer contacts and communication</p>
          </div>
        </div>
        
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Contact</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Filter className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Filters & Search</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* State Filter */}
          <div>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option>All States</option>
              <option>Delhi</option>
              <option>Maharashtra</option>
              <option>Karnataka</option>
              <option>Himachal Pradesh</option>
            </select>
          </div>

          {/* Gender Filter */}
          <div>
            <select
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option>All Genders</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>

          {/* Date Filter */}
          <div>
            <input
              type="date"
              placeholder="From"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Contacts Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">Contacts ({filteredContacts.length})</h3>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">State</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">District</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preferred Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredContacts.map((contact) => (
                <tr key={contact.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{contact.phoneNumber}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-blue-600">{contact.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{contact.gender}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{contact.state}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{contact.district}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getPreferredContactColor(contact.preferredContact)}`}>
                      {getPreferredContactIcon(contact.preferredContact)}
                      <span className="ml-1">{contact.preferredContact}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button className="text-gray-400 hover:text-blue-600 transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-green-600 transition-colors">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-red-600 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredContacts.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No contacts found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactsPage;