import { supabase } from './client';

const table = 'contacts';

export const getContacts = async () => {
  const { data, error } = await supabase
    .from(table)
    .select('*');
  if (error) throw new Error(error.message);
  return data;
};

export const addEditContact = async (contact) => {
  const { data, error } = contact.id
    ? await supabase
        .from(table)
        .update(contact)
        .match({ id: contact.id })
    : await supabase
        .from(table)
        .insert([contact]);
  if (error) throw new Error(error.message);
  return data;
};

export const deleteContact = async (id) => {
  const { data, error } = await supabase
    .from(table)
    .delete()
    .match({ id });
  if (error) throw new Error(error.message);
  return data;
};