// import React, { useState } from 'react';

// export const ThemeContext = React.createContext();

// export const ThemeContextProvider = (props) => {

//     const [themeColors, setThemeColors] = useState({
//         background: "#222222",
//         foreground: "#ffffff"
//     });

//     const updateThemeColors = (themeObject) => {
//         setThemeColors(themeObject);
//     }

//     return (
//         <ThemeContext.Provider value={{
//             theme: themeColors,
//             actions: {
//                 updateThemeColors: updateThemeColors
//             }
//         }}>
//             {props.children}
//         </ThemeContext.Provider>
//     );
// }