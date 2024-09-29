import { createContext, useState } from "react";

export const AdminContext = createContext()

const AdminContextProvider = ({ children }) => {

    const backend_url = import.meta.env.VITE_BACKEND_URL
    const [token, setToken] = useState('')

    const value = { token, setToken }
    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider