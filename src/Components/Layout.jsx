// // src/components/Layout.js
// import React, { useState } from 'react';
// import { MdPerson, MdClose, MdContrast } from 'react-icons/md';
// import { useNavigate } from 'react-router-dom';
// import { useContrast } from '../hooks/usecontrast';

// const Layout = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const { contrastMode, toggleContrast } = useContrast();
//   const navigate = useNavigate();

//   const getContrastLabel = () => {
//     switch (contrastMode) {
//       case 'normal':
//         return 'Kontrast: Normal';
//       case 'high':
//         return 'Kontrast: Hoch';
//       case 'inverted':
//         return 'Kontrast: Invertiert';
//       default:
//         return 'Kontrast +';
//     }
//   };

//   const menuItems = [
//     { 
//       icon: <MdContrast />, 
//       label: getContrastLabel(),
//       onClick: toggleContrast 
//     }
//   ];

//   return (
//     <div className="fixed right-4 top-4">
//       <div className="relative">
//         <button
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//           className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors"
//         >
//           <MdPerson className="w-6 h-6" />
//         </button>

//         {isMenuOpen && (
//           <div className="absolute right-0 top-14 w-64 bg-white rounded-lg shadow-xl border border-gray-200">
//             <div className="p-4 border-b border-gray-200">
//               <div className="flex justify-between items-center">
//                 <h2 className="text-lg font-semibold">So funktioniert UserWay</h2>
//                 <button
//                   onClick={() => setIsMenuOpen(false)}
//                   className="text-gray-500 hover:text-gray-700"
//                 >
//                   <MdClose className="w-6 h-6" />
//                 </button>
//               </div>
//             </div>

//             <div className="p-4 grid grid-cols-2 gap-4">
//               {menuItems.map((item, index) => (
//                 <button
//                   key={index}
//                   className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
//                   onClick={item.onClick}
//                 >
//                   <span className="text-2xl mb-2">{item.icon}</span>
//                   <span className="text-sm text-center">{item.label}</span>
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Layout;




//-----------------------------------------------------------------------------------------------------



import React, { useState } from 'react';
import { MdPerson, MdClose, MdContrast } from 'react-icons/md';
import { useContrast } from './Contrast/ContrastContext';
import '../styles/contrast.css'


const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { contrastMode, toggleContrast } = useContrast();

  const getContrastLabel = () => {
    switch (contrastMode) {
      case 'normal':
        return 'Kontrast: Normal';
      case 'high':
        return 'Kontrast: Hoch';
      case 'inverted':
        return 'Kontrast: Invertiert';
      default:
        return 'Kontrast +';
    }
  };

  const menuItems = [
    { 
      icon: <MdContrast className="w-6 h-6" />, 
      label: getContrastLabel(),
      onClick: toggleContrast 
    }
  ];

  return (
    <div className="fixed right-4 top-4">
      <div className="relative">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors"
          aria-expanded={isMenuOpen}
          aria-label="Open accessibility menu"
        >
          <MdPerson className="w-6 h-6" />
        </button>

        {isMenuOpen && (
          <div 
            className="absolute right-0 top-14 w-64 bg-white rounded-lg shadow-xl border border-gray-200"
            role="dialog"
            aria-label="Accessibility options"
          >
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">So funktioniert UserWay</h2>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label="Close menu"
                >
                  <MdClose className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-4 grid grid-cols-2 gap-4">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  onClick={() => {
                    item.onClick();
                    setIsMenuOpen(false);
                  }}
                  aria-label={item.label}
                >
                  <span className="text-2xl mb-2" aria-hidden="true">{item.icon}</span>
                  <span className="text-sm text-center">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;
