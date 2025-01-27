# 🎛️ User Management Dashboard

This is a **User Management App** built with React 🚀, featuring modern UI components and state management. It enables user data management with search, pagination, and CRUD operations. Data persistence is handled through local storage with mock API integration.

## 🛠️ Setup Instructions

### Prerequisites:
📦 Install **Node.js** and **npm** from [Node.js](https://nodejs.org/)

### Steps to Run the Project:

1. **📥 Clone the Repository:**
    ```bash
    git clone https://github.com/BasavarajuVB/User-Management-Dashboard-Ajackus.git
    cd user-management-dashboard
    ```

2. **⚙️ Install Dependencies:**
    Run this command to install dependencies:
    ```bash
    npm install
    ```

3. **🚀 Start the Project:**
    Launch the development server:
    ```bash
    npm start
    ```
    The app will open in your browser at `http://localhost:3000`

---

## 📁 Directory Structure

### `src/` 
This folder contains the source files for the app.

- **📄 `App.js`**: Main component orchestrating all other components
- **📂 `components/`**: React component collection
  - **👤 `EachUser.js`**: Individual user display component
  - **🛡️ `ErrorBoundary.js`**: Error handling wrapper component
  - **📑 `Pagination.js`**: Page navigation component
  - **📝 `UserForm.js`**: User data entry modal
  - **📋 `UserList.js`**: User data display with search
- **🎨 `styles/`**: CSS styling files

### `public/`
- **🌐 `index.html`**: Root HTML file

---

## 🔍 Component Breakdown

### 1. **👤 EachUser.js**
- **Purpose**: Individual user data display
- **Props**:
  - `user`: User data object
  - `onEdit`: Edit modal trigger
  - `onDelete`: User deletion handler

### 2. **🛡️ ErrorBoundary.js**
- **Purpose**: Error handling wrapper
- **Props**:
  - `children`: Protected components

### 3. **📑 Pagination.js**
- **Purpose**: Page navigation control
- **Props**:
  - `totalItems`: Total user count
  - `itemsPerPage`: Users per page
  - `currentPage`: Active page
  - `paginate`: Page change handler

### 4. **📝 UserForm.js**
- **Purpose**: User data entry interface
- **Props**:
  - `user`: User being edited
  - `onClose`: Modal close handler
  - `onSave`: Data save handler
  - `departments`: Available departments

### 5. **📋 UserList.js**
- **Purpose**: User data display manager
- **Props**:
  - `users`: User data array
  - `searchTerm`: Search filter
  - `showModal`: Modal visibility state
  - `editingUser`: Currently edited user
  - `isFetching`: Loading state

---

## 💡 Challenges & Future Improvements

### 🚧 Challenges:
1. **💾 State Management**: LocalStorage synchronization
2. **⚠️ Error Handling**: Graceful error management
3. **🔍 Search Efficiency**: Multi-field filtering
4. **📑 Pagination**: Dynamic page calculation

### 🎯 Potential Improvements:
1. **🔐 Authentication**: User access control
2. **🔍 Advanced Search**: Multi-field filtering system
3. **✨ UI Enhancements**: Animation integration
4. **🔌 Backend Integration**: Real API implementation
5. **📢 Error Handling**: Enhanced error feedback
