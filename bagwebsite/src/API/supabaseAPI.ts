import { supabase } from "$lib/supabase";
// Authentication functions

// User registration
const register = async (email: string, password: string, first_name: string, last_name: string, role: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  
  // After successfully signing up, insert user details into the profiles table
  if (!error) {
    // Use async/await to get the user information
    const { data: user, error: userError } = await supabase.auth.getUser();
    
    if (userError) {
      // Handle the error retrieving user information, if needed.
      return { data, error: userError };
    }
    
    const { data: insertData, error: insertError } = await supabase
      .from('profiles')
      .upsert([
        {
          id: user.user.id,
          first_name,
          last_name,
          email,
          role,
        },
      ], );
    return { data: { user, insertData }, error: insertError };
  }
  
  return { data, error };
};



// User login
const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

// User logout
const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

// Database functions

// Get User Profile
const getUserProfile = async (uuid: unknown ) => {
  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', uuid)
    .single();
  return { data: profiles, error };
};

// Get User Role
const getUserRole = async (userId: unknown) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', userId)
    .single();
  return { data, error };
};

// Get all products
const getAllProducts = async () => {
  const { data, error } = await supabase.from('products').select('*');
  return { data, error };
};

// Get a product by ID
const getProductById = async (productId: unknown) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('product_id', productId)
    .single();
  return { data, error };
};

// Add a new product
const addProduct = async (product: unknown) => {
  const { data, error } = await supabase.from('products').upsert([product]);
  return { data, error };
};

// Update a product
const updateProduct = async (productId: unknown, updates: unknown) => {
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('product_id', productId);
  return { data, error };
};

// Delete a product
const deleteProduct = async (productId: number) => {
  const { data, error } = await supabase
    .from('products')
    .delete()
    .eq('product_id', productId);
  return { data, error };
};

// Add a new address
const addAddress = async (description: string, street_address: string, city: string, state: string, postal_code: string, user_id: unknown) => {
  const { data, error } = await supabase.from('addresses').upsert([
    {
      description,
      street_address,
      city,
      state,
      postal_code,
      user_id,
    },
  ]);
  return { data, error };
};

// Add a new card
const addCard = async (description: string, card_number: string, expiration_date: Date, cvv: string, user_id: unknown) => {
  const { data, error } = await supabase.from('creditcards').upsert([
    {
      description,
      card_number,
      expiration_date,
      cvv,
      user_id,
    },
  ]);
  return { data, error };
};

// Get user addresses
const getAddresses = async (user_id: unknown) => {
  const { data, error } = await supabase
    .from('addresses')
    .select('*')
    .eq('user_id', user_id);
  return { data, error };
};

// Get user cards
const getCards = async (user_id: unknown) => {
  const { data, error } = await supabase
    .from('creditcards')
    .select('*')
    .eq('user_id', user_id);
  return { data, error };
};

// Add a new order
const addOrder = async (order: unknown) => {
  const { data, error } = await supabase.from('orders').upsert([order]).select();
  return { data, error }
};

const updateOrder = async(order_id: unknown, new_status: unknown) => {
  const { data, error } = await supabase.from('orders').update({ order_status: new_status }).eq('order_id', order_id).select();
  return { data, error }
};


// Get orders for a specific user
const getOrders = async (user_id: unknown) => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', user_id);
  return { data, error };
};

const getOrderByID = async (order_id: unknown) => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('order_id', order_id)
    .single();
  return { data, error };
};

// Add a new order item
const addOrderItem = async (order_item: unknown) => {
  const { data, error } = await supabase.from('orderitems').upsert([order_item]);
  return { data, error }
};

// Get order items for a specific order
const getOrderItems = async (order_id: unknown) => {
  const { data, error } = await supabase
    .from('orderitems')
    .select('*')
    .eq('order_id', order_id);
  return { data, error };
};


// Export all functions
export {
  register,
  signIn,
  signOut,
  getUserProfile,
  getUserRole,
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  addAddress,
  addCard,
  getAddresses,
  getCards,
  addOrder,
  updateOrder,
  addOrderItem,
  getOrders,
  getOrderByID,
  getOrderItems
};