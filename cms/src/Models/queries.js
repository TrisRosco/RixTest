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

export const addContact = async (contact) => {
  try {
    const { data, error } = await supabase.from(table).insert([contact]);
    if (error) throw new Error(error.message);
    console.log("Contact added:", data);
    return data;
  } catch (error) {
    console.error("Error adding contact:", error);
    throw error;
  }
};

export const updateContact = async (id, contact) => {
  try {
    // Ensure that the table is set correctly, and the update operation is chained with a select to return the updated row
    const { data, error } = await supabase
      .from(table)
      .update(contact)
      .match({ id })
      .select(); // Add this line to ensure the updated data is being fetched

    if (error) throw new Error(error.message);
    console.log("Contact updated:", data);

    // Supabase returns an array of updated records; make sure to return the first item if that's what you expect
    return data && data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error("Error updating contact:", error);
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
