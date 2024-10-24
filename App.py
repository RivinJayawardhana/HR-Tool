import tkinter as tk
from tkinter import messagebox, ttk
import sqlite3

def create_database():
    conn = sqlite3.connect('documents.db')
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS documents (
            id INTEGER PRIMARY KEY,
            name TEXT,
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
    

        self.create_form()





    def create_form(self):
        labels = [
            "Name"
        ]
        variables = [
            self.name_var
        ]

        for i, (label, var) in enumerate(zip(labels, variables)):
            tk.Label(self.root, text=label).grid(row=i, column=0, padx=10, pady=5)
            tk.Entry(self.root, textvariable=var).grid(row=i, column=1, padx=10, pady=5)

        tk.Button(self.root, text="Submit", command=self.submit_document).grid(row=8, column=0, pady=10)


    def submit_document(self):
        conn = sqlite3.connect('documents.db')
        c = conn.cursor()
        c.execute('''
            INSERT INTO documents (name)
            VALUES (?)
        ''', (self.name_var.get()))
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
        name = self.search_var.get()
        conn = sqlite3.connect('documents.db')
        c = conn.cursor()
        c.execute('SELECT * FROM documents WHERE name = ?', (name,))
        result = c.fetchall()
        conn.close()

        # Clear existing data in the tree
        for row in self.tree.get_children():
            self.tree.delete(row)

        if result:
            for row in result:
                self.tree.insert("", tk.END, values=row)
        else:
            messagebox.showwarning("Not Found", "No documents found for that name.")

     
if __name__ == "__main__":
    root = tk.Tk()
    app = DocumentTool(root)
    root.mainloop()
