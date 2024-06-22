import React, { createContext, useState } from 'react';

const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState({
        name: "Nguyen Duc Trong",
        email: "trong.nguyen.cit20@eiu.edu.vn",
        phone: "0988 642 123",
        address: "Phu Chanh, Tan Uyen, BD"
    });

    return (
        <ProfileContext.Provider value={{ profile, setProfile }}>
            {children}
        </ProfileContext.Provider>
    );
};

export { ProfileContext, ProfileProvider };
