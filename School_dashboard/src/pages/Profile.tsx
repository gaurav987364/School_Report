import { UserProfile } from '@clerk/clerk-react';

const Profile = () => {
  return (
    <div className="max-h-full bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl">
        <UserProfile
          appearance={{
            variables: {
              colorPrimary: '#6366f1',       // Using your brand's indigo
              colorText: '#1f2937',          // Gray-800
              colorTextSecondary: '#4b5563', // Gray-600
              colorBackground: '#ffffff',    // White
              colorInputBackground: '#f3f4f6', // Gray-100
              borderRadius: '0.5rem',
              spacingUnit: '0.5rem',
              fontFamily: 'Inter, sans-serif',
              
              // Dark mode variables
              // Removed invalid property 'colorAlphaShade'
              colorShimmer: 'rgba(107, 114, 128, 0.05)',
            },
            elements: {
              card: 'shadow-none bg-transparent',
              navbar: 'border-b border-gray-200 dark:border-gray-700',
              navbarButton: 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700',
              headerTitle: 'text-gray-900 dark:text-white',
              headerSubtitle: 'text-gray-500 dark:text-gray-400',
              formFieldLabel: 'text-gray-700 dark:text-gray-300',
              formFieldInput: 'bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400',
              footerActionLink: 'text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300',
              avatarBox: 'shadow-none border-2 border-white dark:border-gray-800',
              profileSectionPrimaryButton: 'bg-indigo-600 hover:bg-indigo-700 text-white',
            }
          }}
          routing="path"
          path="/profile"
        />
      </div>
    </div>
  );
};

export default Profile;