import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { LogOut, Plus, Home, Users, Calendar, Trash2, Edit2, UploadCloud } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

export function AdminDashboard() {
  const { user, logout, api } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('properties');
  const [properties, setProperties] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Modal State
  const [editingProperty, setEditingProperty] = useState<any | 'NEW' | null>(null);
  
  // Image Slots
  const [existingPhotos, setExistingPhotos] = useState<string[]>(['', '', '']);
  const [newPhotos, setNewPhotos] = useState<(File | null)[]>([null, null, null]);
  
  const defaultForm = {
    title: '', description: '', price: '', location: '', status: 'Available',
    listingType: 'Sale', propertyType: 'House', bedrooms: 'N/A', furnishing: 'N/A', area: '',
    amenities: '', ownerPhone: ''
  };
  const [editForm, setEditForm] = useState(defaultForm);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }

    const fetchDashboardData = async () => {
      try {
        const { data } = await api.get('/properties');
        setProperties(data);
      } catch (err) {
        console.error('Failed to load dashboard data');
      }
    };
    fetchDashboardData();
  }, [user, navigate, api]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const openAddModal = () => {
    setEditingProperty('NEW');
    setEditForm(defaultForm);
    setExistingPhotos(['', '', '']);
    setNewPhotos([null, null, null]);
  };

  const openEditModal = (property: any) => {
    setEditingProperty(property);
    setEditForm({
      title: property.title || '',
      description: property.description || '',
      price: property.price || '',
      location: property.location || '',
      status: property.status || 'Available',
      listingType: property.listingType || 'Sale',
      propertyType: property.propertyType || 'House',
      bedrooms: property.bedrooms || 'N/A',
      furnishing: property.furnishing || 'N/A',
      area: property.area || '',
      amenities: property.amenities ? property.amenities.join(', ') : '',
      ownerPhone: property.ownerDetails?.phone || ''
    });
    setExistingPhotos([
      property.photos?.[0] || '',
      property.photos?.[1] || '',
      property.photos?.[2] || ''
    ]);
    setNewPhotos([null, null, null]);
  };

  const handleDeleteProperty = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this property?')) return;
    try {
      await api.delete(`/properties/${id}`);
      setProperties(properties.filter(p => p._id !== id));
    } catch (err) {
      console.error('Failed to delete property', err);
      alert('Failed to delete property.');
    }
  };

  const handlePhotoChange = (idx: number, file: File | null) => {
    const updated = [...newPhotos];
    updated[idx] = file;
    setNewPhotos(updated);
  };

  const handleSaveProperty = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let finalPhotos = [...existingPhotos];
      const filesToUpload = newPhotos.filter(f => f !== null);
      
      // Upload images if selected
      if (filesToUpload.length > 0) {
        const formData = new FormData();
        filesToUpload.forEach(file => {
          formData.append('media', file as File);
        });
        const uploadRes = await api.post('/upload/multiple', formData);
        const uploadedPaths = uploadRes.data; // array of paths
        
        let uploadIdx = 0;
        newPhotos.forEach((file, idx) => {
          if (file) {
            finalPhotos[idx] = uploadedPaths[uploadIdx];
            uploadIdx++;
          }
        });
      }

      // Build payload
      const payload = {
        ...editForm,
        amenities: editForm.amenities.split(',').map(a => a.trim()).filter(a => a),
        photos: finalPhotos.filter(p => p !== ''),
        ownerDetails: { phone: editForm.ownerPhone }
      };

      if (editingProperty === 'NEW') {
        const { data } = await api.post('/properties', payload);
        setProperties([data, ...properties]);
      } else {
        const { data } = await api.put(`/properties/${editingProperty._id}`, payload);
        setProperties(properties.map(p => p._id === data._id ? data : p));
      }

      setEditingProperty(null); // Close modal
    } catch (err: any) {
      console.error('Failed to save property', err);
      alert(err.response?.data?.message || 'Failed to save property.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 flex max-w-[1600px] w-full mx-auto px-4 py-8 gap-8">
        {/* Sidebar */}
        <aside className="w-64 shrink-0 space-y-2">
          <div className="p-4 bg-card border border-border rounded-2xl mb-4 shadow-sm">
            <h2 className="font-bold text-lg">{user.name}</h2>
            <p className="text-sm text-muted-foreground capitalize">{user.role}</p>
          </div>
          <button 
            onClick={() => setActiveTab('properties')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'properties' ? 'bg-primary text-primary-foreground font-semibold' : 'hover:bg-secondary'}`}
          >
            <Home className="h-5 w-5" /> Manage Properties
          </button>
          <button 
            onClick={() => setActiveTab('users')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'users' ? 'bg-primary text-primary-foreground font-semibold' : 'hover:bg-secondary'}`}
          >
            <Users className="h-5 w-5" /> Users
          </button>
          <button 
            onClick={() => setActiveTab('visits')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'visits' ? 'bg-primary text-primary-foreground font-semibold' : 'hover:bg-secondary'}`}
          >
            <Calendar className="h-5 w-5" /> Scheduled Visits
          </button>
          <hr className="my-4 border-border" />
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="h-5 w-5" /> Log Out
          </button>
        </aside>

        {/* Content Area */}
        <div className="flex-1 bg-card border border-border rounded-2xl p-6 shadow-sm min-h-[500px]">
          {activeTab === 'properties' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Property Listings</h1>
                <button 
                  onClick={openAddModal}
                  className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl font-semibold hover:bg-primary/90 transition"
                >
                  <Plus className="h-5 w-5" /> Add Property
                </button>
              </div>
              <div className="grid gap-4">
                {properties.map((p: any) => (
                  <div key={p._id} className="flex justify-between items-center p-4 border border-border rounded-xl">
                    <div className="flex items-center gap-4">
                      {p.photos && p.photos.length > 0 ? (
                        <img src={`http://localhost:9000${p.photos[0]}`} alt={p.title} className="w-16 h-16 rounded-md object-cover" />
                      ) : (
                        <div className="w-16 h-16 rounded-md bg-secondary flex items-center justify-center">No Img</div>
                      )}
                      <div>
                        <h3 className="font-semibold text-lg">{p.title}</h3>
                        <p className="text-sm text-muted-foreground">{p.location} • ₹{p.price}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${p.status === 'Available' ? 'bg-green-500/10 text-green-500' : 'bg-gray-500/10 text-gray-500'}`}>
                        {p.status}
                      </span>
                      <button 
                        onClick={() => openEditModal(p)}
                        className="text-primary p-2 border border-primary/20 rounded-full hover:bg-primary/10 transition"
                        title="Edit Property"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteProperty(p._id)}
                        className="text-red-500 p-2 border border-red-500/20 rounded-full hover:bg-red-500/10 transition"
                        title="Delete Property"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
                {properties.length === 0 && <p className="text-muted-foreground">No properties found.</p>}
              </div>
            </div>
          )}

          {activeTab === 'users' && <div><h1 className="text-2xl font-bold mb-6">User Management</h1><p className="text-muted-foreground">User lists will appear here.</p></div>}
          {activeTab === 'visits' && <div><h1 className="text-2xl font-bold mb-6">Scheduled Visits</h1><p className="text-muted-foreground">Visit requests will appear here.</p></div>}
        </div>
      </main>

      {/* Unified Add/Edit Property Modal */}
      <Dialog open={!!editingProperty} onOpenChange={(open) => !open && setEditingProperty(null)}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProperty === 'NEW' ? 'Add New Property' : 'Edit Property'}</DialogTitle>
            <DialogDescription>
              Fill in the details below. Required fields are marked with *.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveProperty} className="grid gap-6 py-4">
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2 col-span-2">
                <label className="text-sm font-medium">Title *</label>
                <input value={editForm.title} onChange={e => setEditForm({...editForm, title: e.target.value})} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm" required />
              </div>

              <div className="grid gap-2 col-span-2">
                <label className="text-sm font-medium">Description *</label>
                <textarea value={editForm.description} onChange={e => setEditForm({...editForm, description: e.target.value})} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm min-h-[80px]" required />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium">Price (₹) *</label>
                <input type="number" value={editForm.price} onChange={e => setEditForm({...editForm, price: e.target.value})} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm" required />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium">Location *</label>
                <input value={editForm.location} onChange={e => setEditForm({...editForm, location: e.target.value})} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm" placeholder="e.g. RS Puram" required />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium">Area *</label>
                <input value={editForm.area} onChange={e => setEditForm({...editForm, area: e.target.value})} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm" placeholder="e.g. 1200 sq.ft" required />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium">Contact Phone *</label>
                <input value={editForm.ownerPhone} onChange={e => setEditForm({...editForm, ownerPhone: e.target.value})} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm" placeholder="e.g. 9876543210" required />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium">Listing Type</label>
                <select value={editForm.listingType} onChange={e => setEditForm({...editForm, listingType: e.target.value})} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option value="Sale">Sale</option>
                  <option value="Rent">Rent</option>
                </select>
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium">Property Type</label>
                <select value={editForm.propertyType} onChange={e => setEditForm({...editForm, propertyType: e.target.value})} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option value="House">House</option>
                  <option value="Villa">Villa</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Plot">Plot</option>
                  <option value="Commercial Land">Commercial Land</option>
                </select>
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium">Bedrooms</label>
                <select value={editForm.bedrooms} onChange={e => setEditForm({...editForm, bedrooms: e.target.value})} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option value="N/A">N/A</option>
                  <option value="1BHK">1BHK</option>
                  <option value="2BHK">2BHK</option>
                  <option value="3BHK">3BHK</option>
                  <option value="4+BHK">4+BHK</option>
                </select>
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium">Furnishing</label>
                <select value={editForm.furnishing} onChange={e => setEditForm({...editForm, furnishing: e.target.value})} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option value="N/A">N/A</option>
                  <option value="Unfurnished">Unfurnished</option>
                  <option value="Semi-furnished">Semi-furnished</option>
                  <option value="Furnished">Furnished</option>
                </select>
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium">Status</label>
                <select value={editForm.status} onChange={e => setEditForm({...editForm, status: e.target.value})} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option value="Available">Available</option>
                  <option value="Sold">Sold</option>
                  <option value="Rented">Rented</option>
                </select>
              </div>

              <div className="grid gap-2 col-span-2">
                <label className="text-sm font-medium">Amenities (comma separated)</label>
                <input value={editForm.amenities} onChange={e => setEditForm({...editForm, amenities: e.target.value})} className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm" placeholder="Parking, Pool, Gym" />
              </div>

              <div className="grid gap-4 col-span-2">
                <label className="text-sm font-medium flex items-center gap-2"><UploadCloud className="h-4 w-4" /> Upload Property Images</label>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold">Main Image</label>
                    <input 
                      type="file" accept="image/*"
                      onChange={e => handlePhotoChange(0, e.target.files?.[0] || null)}
                      className="w-full rounded-md border border-input bg-secondary/50 p-2 text-xs"
                    />
                    {existingPhotos[0] && !newPhotos[0] && <p className="text-[10px] text-green-500 truncate">Existing: {existingPhotos[0].split('/').pop()}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-semibold">Thumbnail 1</label>
                    <input 
                      type="file" accept="image/*"
                      onChange={e => handlePhotoChange(1, e.target.files?.[0] || null)}
                      className="w-full rounded-md border border-input bg-secondary/50 p-2 text-xs"
                    />
                    {existingPhotos[1] && !newPhotos[1] && <p className="text-[10px] text-green-500 truncate">Existing: {existingPhotos[1].split('/').pop()}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-semibold">Thumbnail 2</label>
                    <input 
                      type="file" accept="image/*"
                      onChange={e => handlePhotoChange(2, e.target.files?.[0] || null)}
                      className="w-full rounded-md border border-input bg-secondary/50 p-2 text-xs"
                    />
                    {existingPhotos[2] && !newPhotos[2] && <p className="text-[10px] text-green-500 truncate">Existing: {existingPhotos[2].split('/').pop()}</p>}
                  </div>
                </div>

                {editingProperty !== 'NEW' && (
                  <p className="text-xs text-muted-foreground mt-1">Leave a slot empty to keep the existing image.</p>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-border">
              <button 
                type="button" 
                onClick={() => setEditingProperty(null)}
                className="px-4 py-2 border border-input rounded-md text-sm font-medium hover:bg-secondary"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 flex items-center gap-2"
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save Property'}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
