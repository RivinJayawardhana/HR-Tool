
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

