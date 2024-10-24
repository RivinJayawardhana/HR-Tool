
import tkinter as tk
from tkinter import messagebox
import sqlite3


def create_database():
    conn = sqlite3.connect('documents.db')
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS documents (
            id INTEGER PRIMARY KEY,
            name TEXT,
            department TEXT,
            items TEXT,
            brand TEXT,
            serial_no TEXT,
            quantity TEXT,
            doc_type TEXT,
            remark TEXT,
            date TEXT
        )
    ''')
    conn.commit()
    conn.close()


    class DocumentTool:
    def __init__(self, root):
        self.root = root
        self.root.title("Document Management Tool")

        # Create the database
        create_database()

        # Form Fields
        self.name_var = tk.StringVar()
        self.department_var = tk.StringVar()
        self.items_var = tk.StringVar()
        self.brand_var = tk.StringVar()
        self.serial_no_var = tk.StringVar()
        self.quantity_var = tk.StringVar()
        self.doc_type_var = tk.StringVar()
        self.remark_var = tk.StringVar()
        self.date_var = tk.StringVar()

        # Create form labels and entries
        self.create_form()

        # Search field
        tk.Label(root, text="Search by Name:").grid(row=9, column=0)
        self.search_var = tk.StringVar()
        tk.Entry(root, textvariable=self.search_var).grid(row=9, column=1)
        tk.Button(root, text="Search", command=self.search_document).grid(row=9, column=2)

    def create_form(self):
        labels = [
            "Name", "Department", "Items", "Brand",
            "Serial No", "Quantity", "Document Type", "Remark", "Date"
        ]
        variables = [
            self.name_var, self.department_var, self.items_var,
            self.brand_var, self.serial_no_var, self.quantity_var,
            self.doc_type_var, self.remark_var, self.date_var
        ]

        for i, (label, var) in enumerate(zip(labels, variables)):
            tk.Label(self.root, text=label).grid(row=i, column=0)
            tk.Entry(self.root, textvariable=var).grid(row=i, column=1)

        tk.Button(self.root, text="Submit", command=self.submit_document).grid(row=8, column=0)

    def submit_document(self):
        conn = sqlite3.connect('documents.db')
        c = conn.cursor()
        c.execute('''
            INSERT INTO documents (name, department, items, brand, serial_no, quantity, doc_type, remark, date)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (self.name_var.get(), self.department_var.get(), self.items_var.get(),
              self.brand_var.get(), self.serial_no_var.get(), self.quantity_var.get(),
              self.doc_type_var.get(), self.remark_var.get(), self.date_var.get()))
        conn.commit()
        conn.close()
        messagebox.showinfo("Success", "Document submitted successfully!")

    def search_document(self):
        name = self.search_var.get()
        conn = sqlite3.connect('documents.db')
        c = conn.cursor()
        c.execute('SELECT * FROM documents WHERE name = ?', (name,))
        result = c.fetchall()
        conn.close()

        if result:
            message = "\n".join([str(r) for r in result])
            messagebox.showinfo("Search Results", message)
        else:
            messagebox.showwarning("Not Found", "No documents found for that name.")

if __name__ == "__main__":
    root = tk.Tk()
    app = DocumentTool(root)
    root.mainloop()


