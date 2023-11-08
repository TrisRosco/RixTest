import { supabase } from "./client";

const table = "contacts";

export const getContacts = async () => {
  try {
    const { data, error } = await supabase.from(table).select("*");
    if (error) throw new Error(error.message);
    console.log("Contacts fetched:", data);
    return data;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    throw error; 
  }
};

export const addEditContact = async (contact) => {
  try {
    const { data, error } = contact.id
      ? await supabase.from(table).update(contact).match({ id: contact.id })
      : await supabase.from(table).insert([contact]);
    if (error) throw new Error(error.message);
    console.log("Contact added/edited:", data);
    return data;
  } catch (error) {
    console.error("Error adding/editing contact:", error);
    throw error; 
  }
};

export const deleteContact = async (id) => {
  try {
    const { data, error } = await supabase.from(table).delete().match({ id });
    if (error) throw new Error(error.message);
    console.log("Contact deleted:", data);
    return data;
  } catch (error) {
    console.error("Error deleting contact:", error);
    throw error; 
  }
};
