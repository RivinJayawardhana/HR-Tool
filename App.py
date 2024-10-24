import tkinter as tk
from tkinter import messagebox, ttk
import sqlite3

def create_database():
    conn = sqlite3.connect('documents.db')
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS documents (
            id INTEGER PRIMARY KEY,
            name TEXT
        )
    ''')
    conn.commit()
    conn.close()

class DocumentTool:
    def __init__(self, root):
        self.root = root
        self.root.title("Document Management Tool")
        self.root.geometry("800x600")

        # Create the database
        create_database()

        # Form Fields
        self.name_var = tk.StringVar()
        self.search_var = tk.StringVar()

        self.create_form()
        self.create_table()
        self.populate_table()

    def create_form(self):
        labels = ["Name"]
        variables = [self.name_var]

        for i, (label, var) in enumerate(zip(labels, variables)):
            tk.Label(self.root, text=label).grid(row=i, column=0, padx=40, pady=25)
            tk.Entry(self.root, textvariable=var).grid(row=i, column=1, padx=40, pady=25)

        tk.Button(self.root, text="Submit", command=self.submit_document).grid(row=2, column=0, pady=10)

        # Search Field
        tk.Label(self.root, text="Search by Name:").grid(row=2, column=1, padx=10)
        tk.Entry(self.root, textvariable=self.search_var).grid(row=2, column=2, padx=10)
        tk.Button(self.root, text="Search", command=self.search_document).grid(row=2, column=3, padx=10)

        # Delete Button
        tk.Button(self.root, text="Delete Selected", command=self.delete_document).grid(row=2, column=4, padx=10)

    def create_table(self):
        self.tree = ttk.Treeview(self.root, columns=("ID", "Name"), show='headings')
        self.tree.heading("ID", text="ID")
        self.tree.heading("Name", text="Name")
        self.tree.grid(row=3, column=0, columnspan=5, padx=10, pady=10, sticky='nsew')

        self.scroll_y = ttk.Scrollbar(self.root, orient="vertical", command=self.tree.yview)
        self.scroll_y.grid(row=3, column=5, sticky='ns')
        self.tree.configure(yscrollcommand=self.scroll_y.set)

        self.root.grid_rowconfigure(3, weight=1)

    def submit_document(self):
        conn = sqlite3.connect('documents.db')
        c = conn.cursor()
        c.execute('''
            INSERT INTO documents (name)
            VALUES (?)
        ''', (self.name_var.get(),))
        conn.commit()
        conn.close()
        messagebox.showinfo("Success", "Document submitted successfully!")
        self.populate_table()

    def populate_table(self):
        # Clear existing data in the tree
        for row in self.tree.get_children():
            self.tree.delete(row)

        conn = sqlite3.connect('documents.db')
        c = conn.cursor()
        c.execute('SELECT * FROM documents')
        rows = c.fetchall()
        conn.close()

        for row in rows:
            self.tree.insert("", tk.END, values=row)

    def search_document(self):
        search_term = self.search_var.get()
        for row in self.tree.get_children():
            self.tree.delete(row)

        conn = sqlite3.connect('documents.db')
        c = conn.cursor()
        c.execute('SELECT * FROM documents WHERE name LIKE ?', ('%' + search_term + '%',))
        rows = c.fetchall()
        conn.close()

        for row in rows:
            self.tree.insert("", tk.END, values=row)

        if not rows:
            messagebox.showinfo("No Results", "No documents found for that name.")

    def delete_document(self):
        selected_item = self.tree.selection()
        if not selected_item:
            messagebox.showwarning("Select Item", "Please select a document to delete.")
            return
        
        item_id = self.tree.item(selected_item)["values"][0]

        conn = sqlite3.connect('documents.db')
        c = conn.cursor()
        c.execute('DELETE FROM documents WHERE id = ?', (item_id,))
        conn.commit()
        conn.close()
        messagebox.showinfo("Deleted", "Document deleted successfully!")
        self.populate_table()

if __name__ == "__main__":
    root = tk.Tk()
    app = DocumentTool(root)
    root.mainloop()
