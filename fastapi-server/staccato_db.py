class StaccatoDB:
    """CRUD operations for Staccato SQLite database."""

    def __init__(self, filepath: str):
        self.filepath = filepath
        self.connection = None
        self.cursor = None
    
    def connect(self):
        """Connect to the SQLite database."""
        import sqlite3
        self.connection = sqlite3.connect(self.filepath)
        self.cursor = self.connection.cursor()
    
    def close(self):
        """Close the SQLite database connection."""
        if self.connection:
            self.connection.close()
            self.connection = None
            self.cursor = None
        else:
            print("Connection is already closed.")
    
    def create_table(self, table_name: str, columns: dict):
        """Create a table in the SQLite database."""
        columns_with_types = ", ".join([f"{col} {dtype}" for col, dtype in columns.items()])
        query = f"CREATE TABLE IF NOT EXISTS {table_name} ({columns_with_types})"
        self.cursor.execute(query)
        self.connection.commit()
    
    def insert_data(self, table_name: str, data: dict):
        """Insert data into the SQLite database."""
        columns = ", ".join(data.keys())
        placeholders = ", ".join(["?" for _ in data])
        query = f"INSERT INTO {table_name} ({columns}) VALUES ({placeholders})"
        self.cursor.execute(query, tuple(data.values()))
        self.connection.commit()
    
    def fetch_data(self, table_name: str, conditions: str = None):
        """Fetch data from the SQLite database."""
        query = f"SELECT * FROM {table_name}"
        if conditions:
            query += f" WHERE {conditions}"
        self.cursor.execute(query)
        return self.cursor.fetchall()
