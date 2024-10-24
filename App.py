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
        self.root.geometry("800x600")

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

     
if __name__ == "__main__":
    root = tk.Tk()
    app = DocumentTool(root)
    root.mainloop()
