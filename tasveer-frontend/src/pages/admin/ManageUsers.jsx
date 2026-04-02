import React, { useState } from 'react';

const ManageUsers = ({ usersData = [], onUpdateUser }) => {

  const [search, setSearch] = useState("");

  // ✅ FILTER USERS
  const filteredUsers = usersData.filter(user =>
    user.name?.toLowerCase().includes(search.toLowerCase()) ||
    user.email?.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ TOGGLE STATUS
  const toggleStatus = (id) => {

    if (!onUpdateUser) {
      console.warn("Update handler not provided");
      return;
    }

    const user = usersData.find(u => u.id === id);
    if (!user) return;

    let newStatus;

    if (user.status === "Active") newStatus = "Suspended";
    else if (user.status === "Suspended") newStatus = "Active";
    else if (user.status === "Under Review") newStatus = "Active";

    onUpdateUser(id, newStatus);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">

        <div>
          <h1 className="text-4xl md:text-5xl font-display text-[#D4AF37]">
            User Directory
          </h1>

          <p className="text-white/30 uppercase tracking-[0.4em] text-[10px] font-bold mt-2">
            Manage Artist & Client Access
          </p>
        </div>

        {/* SEARCH */}
        <input 
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users..." 
          className="bg-white/5 border border-white/10 p-4 rounded-xl text-xs outline-none focus:border-[#D4AF37] text-white w-full md:w-64"
        />

      </div>

      {/* TABLE */}
      <div className="glass-panel rounded-[3rem] overflow-hidden border-white/5">

        <table className="w-full text-left">

          <thead className="bg-white/5 text-[9px] uppercase tracking-widest text-white/40 font-bold">
            <tr>
              <th className="px-6 md:px-10 py-6">User</th>
              <th className="px-6 md:px-10 py-6">Role</th>
              <th className="px-6 md:px-10 py-6">Status</th>
              <th className="px-6 md:px-10 py-6 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>

            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (

                <tr 
                  key={user.id} 
                  className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                >

                  {/* USER */}
                  <td className="px-6 md:px-10 py-6 md:py-8">
                    <div className="text-white font-bold">{user.name}</div>
                    <div className="text-[10px] text-white/30 font-mono">{user.email}</div>
                  </td>

                  {/* ROLE */}
                  <td className="px-6 md:px-10 py-6 md:py-8">
                    <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${
                      user.role === 'Photographer' 
                        ? 'border-[#D4AF37]/30 text-[#D4AF37]' 
                        : 'border-white/20 text-white/60'
                    }`}>
                      {user.role}
                    </span>
                  </td>

                  {/* STATUS */}
                  <td className="px-6 md:px-10 py-6 md:py-8">
                    <span className={`text-[9px] uppercase font-bold tracking-tighter ${
                      user.status === 'Active' 
                        ? 'text-green-500' 
                        : user.status === 'Under Review'
                        ? 'text-yellow-400'
                        : 'text-red-500'
                    }`}>
                      {user.status}
                    </span>
                  </td>

                  {/* ACTION */}
                  <td className="px-6 md:px-10 py-6 md:py-8 text-right">
                    <button 
                      onClick={() => toggleStatus(user.id)}
                      className="text-[10px] uppercase font-bold tracking-widest hover:text-[#D4AF37] transition-colors"
                    >
                      Modify Status
                    </button>
                  </td>

                </tr>

              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-10 text-white/30 text-sm">
                  No users found
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default ManageUsers;