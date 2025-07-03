import React, { createContext, useContext, useReducer } from 'react';

interface AppState {
  appointments: any[];
  services: any[];
  staff: any[];
  customers: any[];
  inventory: any[];
  payments: any[];
  notifications: any[];
}

interface AppContextType extends AppState {
  addAppointment: (appointment: any) => void;
  updateAppointment: (id: string, updates: any) => void;
  deleteAppointment: (id: string) => void;
  addService: (service: any) => void;
  updateService: (id: string, updates: any) => void;
  deleteService: (id: string) => void;
  addStaff: (staff: any) => void;
  updateStaff: (id: string, updates: any) => void;
  deleteStaff: (id: string) => void;
  addCustomer: (customer: any) => void;
  updateCustomer: (id: string, updates: any) => void;
  deleteCustomer: (id: string) => void;
  addInventoryItem: (item: any) => void;
  updateInventoryItem: (id: string, updates: any) => void;
  deleteInventoryItem: (id: string) => void;
  addPayment: (payment: any) => void;
  addNotification: (notification: any) => void;
  removeNotification: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialState: AppState = {
  appointments: [
    {
      id: '1',
      customerName: 'Sarah Johnson',
      customerEmail: 'sarah@example.com',
      service: 'Hair Cut & Style',
      stylist: 'Maria Santos',
      date: '2024-01-15',
      time: '10:00',
      duration: 90,
      price: 2500,
      status: 'confirmed'
    },
    {
      id: '2',
      customerName: 'Grace Wanjiku',
      customerEmail: 'grace@example.com',
      service: 'Manicure & Pedicure',
      stylist: 'Alice Kimani',
      date: '2024-01-15',
      time: '14:00',
      duration: 120,
      price: 1800,
      status: 'pending'
    }
  ],
  services: [
    {
      id: '1',
      name: 'Hair Cut & Style',
      category: 'Hair Services',
      price: 2500,
      duration: 90,
      description: 'Professional hair cutting and styling service'
    },
    {
      id: '2',
      name: 'Manicure & Pedicure',
      category: 'Nail Services',
      price: 1800,
      duration: 120,
      description: 'Complete nail care and beautification'
    },
    {
      id: '3',
      name: 'Facial Treatment',
      category: 'Skincare',
      price: 3000,
      duration: 60,
      description: 'Deep cleansing and rejuvenating facial'
    }
  ],
  staff: [
    {
      id: '1',
      name: 'Maria Santos',
      email: 'maria@salon.com',
      role: 'Senior Stylist',
      phone: '+254701234567',
      specialties: ['Hair Cutting', 'Hair Styling', 'Hair Coloring'],
      schedule: {
        monday: '09:00-17:00',
        tuesday: '09:00-17:00',
        wednesday: '09:00-17:00',
        thursday: '09:00-17:00',
        friday: '09:00-17:00',
        saturday: '09:00-15:00',
        sunday: 'Off'
      }
    },
    {
      id: '2',
      name: 'Alice Kimani',
      email: 'alice@salon.com',
      role: 'Nail Technician',
      phone: '+254701234568',
      specialties: ['Manicure', 'Pedicure', 'Nail Art'],
      schedule: {
        monday: '10:00-18:00',
        tuesday: '10:00-18:00',
        wednesday: '10:00-18:00',
        thursday: '10:00-18:00',
        friday: '10:00-18:00',
        saturday: '10:00-16:00',
        sunday: 'Off'
      }
    }
  ],
  customers: [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      phone: '+254701234560',
      dateJoined: '2024-01-01',
      totalVisits: 8,
      totalSpent: 18500,
      loyaltyPoints: 185,
      preferences: ['Hair Services', 'Skincare']
    },
    {
      id: '2',
      name: 'Grace Wanjiku',
      email: 'grace@example.com',
      phone: '+254701234561',
      dateJoined: '2024-01-05',
      totalVisits: 5,
      totalSpent: 12000,
      loyaltyPoints: 120,
      preferences: ['Nail Services']
    }
  ],
  inventory: [
    {
      id: '1',
      name: 'Shampoo - Professional',
      category: 'Hair Care',
      currentStock: 15,
      minStock: 5,
      maxStock: 50,
      unitPrice: 850,
      supplier: 'Beauty Supply Co.',
      lastRestocked: '2024-01-10'
    },
    {
      id: '2',
      name: 'Nail Polish Set',
      category: 'Nail Care',
      currentStock: 8,
      minStock: 10,
      maxStock: 30,
      unitPrice: 1200,
      supplier: 'Nail Art Supplies',
      lastRestocked: '2024-01-08'
    }
  ],
  payments: [
    {
      id: '1',
      appointmentId: '1',
      customerName: 'Sarah Johnson',
      amount: 2500,
      method: 'M-Pesa',
      transactionId: 'MP240115001',
      date: '2024-01-15',
      status: 'completed'
    }
  ],
  notifications: []
};

const appReducer = (state: AppState, action: any): AppState => {
  switch (action.type) {
    case 'ADD_APPOINTMENT':
      return { ...state, appointments: [...state.appointments, action.payload] };
    case 'UPDATE_APPOINTMENT':
      return {
        ...state,
        appointments: state.appointments.map(apt => 
          apt.id === action.payload.id ? { ...apt, ...action.payload.updates } : apt
        )
      };
    case 'DELETE_APPOINTMENT':
      return {
        ...state,
        appointments: state.appointments.filter(apt => apt.id !== action.payload)
      };
    case 'ADD_SERVICE':
      return { ...state, services: [...state.services, action.payload] };
    case 'UPDATE_SERVICE':
      return {
        ...state,
        services: state.services.map(service => 
          service.id === action.payload.id ? { ...service, ...action.payload.updates } : service
        )
      };
    case 'DELETE_SERVICE':
      return {
        ...state,
        services: state.services.filter(service => service.id !== action.payload)
      };
    case 'ADD_STAFF':
      return { ...state, staff: [...state.staff, action.payload] };
    case 'UPDATE_STAFF':
      return {
        ...state,
        staff: state.staff.map(member => 
          member.id === action.payload.id ? { ...member, ...action.payload.updates } : member
        )
      };
    case 'DELETE_STAFF':
      return {
        ...state,
        staff: state.staff.filter(member => member.id !== action.payload)
      };
    case 'ADD_CUSTOMER':
      return { ...state, customers: [...state.customers, action.payload] };
    case 'UPDATE_CUSTOMER':
      return {
        ...state,
        customers: state.customers.map(customer => 
          customer.id === action.payload.id ? { ...customer, ...action.payload.updates } : customer
        )
      };
    case 'DELETE_CUSTOMER':
      return {
        ...state,
        customers: state.customers.filter(customer => customer.id !== action.payload)
      };
    case 'ADD_INVENTORY_ITEM':
      return { ...state, inventory: [...state.inventory, action.payload] };
    case 'UPDATE_INVENTORY_ITEM':
      return {
        ...state,
        inventory: state.inventory.map(item => 
          item.id === action.payload.id ? { ...item, ...action.payload.updates } : item
        )
      };
    case 'DELETE_INVENTORY_ITEM':
      return {
        ...state,
        inventory: state.inventory.filter(item => item.id !== action.payload)
      };
    case 'ADD_PAYMENT':
      return { ...state, payments: [...state.payments, action.payload] };
    case 'ADD_NOTIFICATION':
      return { ...state, notifications: [...state.notifications, action.payload] };
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(notif => notif.id !== action.payload)
      };
    default:
      return state;
  }
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const addAppointment = (appointment: any) => {
    dispatch({ type: 'ADD_APPOINTMENT', payload: { ...appointment, id: Date.now().toString() } });
  };

  const updateAppointment = (id: string, updates: any) => {
    dispatch({ type: 'UPDATE_APPOINTMENT', payload: { id, updates } });
  };

  const deleteAppointment = (id: string) => {
    dispatch({ type: 'DELETE_APPOINTMENT', payload: id });
  };

  const addService = (service: any) => {
    dispatch({ type: 'ADD_SERVICE', payload: { ...service, id: Date.now().toString() } });
  };

  const updateService = (id: string, updates: any) => {
    dispatch({ type: 'UPDATE_SERVICE', payload: { id, updates } });
  };

  const deleteService = (id: string) => {
    dispatch({ type: 'DELETE_SERVICE', payload: id });
  };

  const addStaff = (staff: any) => {
    dispatch({ type: 'ADD_STAFF', payload: { ...staff, id: Date.now().toString() } });
  };

  const updateStaff = (id: string, updates: any) => {
    dispatch({ type: 'UPDATE_STAFF', payload: { id, updates } });
  };

  const deleteStaff = (id: string) => {
    dispatch({ type: 'DELETE_STAFF', payload: id });
  };

  const addCustomer = (customer: any) => {
    dispatch({ type: 'ADD_CUSTOMER', payload: { ...customer, id: Date.now().toString() } });
  };

  const updateCustomer = (id: string, updates: any) => {
    dispatch({ type: 'UPDATE_CUSTOMER', payload: { id, updates } });
  };

  const deleteCustomer = (id: string) => {
    dispatch({ type: 'DELETE_CUSTOMER', payload: id });
  };

  const addInventoryItem = (item: any) => {
    dispatch({ type: 'ADD_INVENTORY_ITEM', payload: { ...item, id: Date.now().toString() } });
  };

  const updateInventoryItem = (id: string, updates: any) => {
    dispatch({ type: 'UPDATE_INVENTORY_ITEM', payload: { id, updates } });
  };

  const deleteInventoryItem = (id: string) => {
    dispatch({ type: 'DELETE_INVENTORY_ITEM', payload: id });
  };

  const addPayment = (payment: any) => {
    dispatch({ type: 'ADD_PAYMENT', payload: { ...payment, id: Date.now().toString() } });
  };

  const addNotification = (notification: any) => {
    dispatch({ type: 'ADD_NOTIFICATION', payload: { ...notification, id: Date.now().toString() } });
  };

  const removeNotification = (id: string) => {
    dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
  };

  return (
    <AppContext.Provider value={{
      ...state,
      addAppointment,
      updateAppointment,
      deleteAppointment,
      addService,
      updateService,
      deleteService,
      addStaff,
      updateStaff,
      deleteStaff,
      addCustomer,
      updateCustomer,
      deleteCustomer,
      addInventoryItem,
      updateInventoryItem,
      deleteInventoryItem,
      addPayment,
      addNotification,
      removeNotification
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};