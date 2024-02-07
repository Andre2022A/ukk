import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './admin/Navbar';
import Sidebar from './admin/Sidebar';
import Footer from './admin/Footer';
import Dashboard from './admin/Dashboard';
import Kategori from './admin/kategori';
import KategoriTambah from './admin/kategori/tambah';
import KategoriEdit from './admin/kategori/edit';
import Gambar from './admin/gambar';
import GambarTambah from './admin/gambar/tambah';
import GambarEdit from './admin/gambar/edit';
import Mobil from './admin/mobil';
import MobilTambah from './admin/mobil/tambah';
import MobilEdit from './admin/mobil/edit';
import { useAuth } from './auth/AuthContext';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Admin() {
    const { authToken } = useAuth(); // Use the useAuth hook for authentication state

    const [isSidebarToggled, setSidebarToggled] = useState(false);

    if (!authToken) {
        return <Navigate to="/login" />;
    }

    const toggleSidebar = () => {
        setSidebarToggled(!isSidebarToggled);
    };

    return (
            <div id="wrapper">
                <Sidebar isToggled={isSidebarToggled} onToggleSidebar={toggleSidebar} />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <Navbar onToggleSidebar={toggleSidebar} />
                        <Routes>
                            <Route path="kategori" element={<Kategori/>} />
                            <Route path="kategori/tambah" element={<KategoriTambah/>} />
                            <Route path="kategori/edit/:id" element={<KategoriEdit />} />
                            <Route path="picture" element={<Gambar/>} />
                            <Route path="picture/tambah" element={<GambarTambah/>} />
                            <Route path="picture/edit/:id" element={<GambarEdit />} />
                            <Route path="mobil" element={<Mobil/>} />
                            <Route path="mobil/tambah" element={<MobilTambah/>} />
                            <Route path="mobil/edit/:id" element={<MobilEdit />} />
                            <Route index element={<Dashboard />} />
                        </Routes>
                    </div>
                    <Footer />
                </div>
            </div>
    );
}

export default Admin;
