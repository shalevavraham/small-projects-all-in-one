export const menus = [
    {
      label: "Home",
      to: "/",
      icon: "home",  // שמות האייקונים במילים, בלי JSX
    },
    {
      label: "Profile",
      to: "/profile",
      icon: "user",
      children: [
        {
          label: "Details",
          to: "details",
          icon: "info-circle",
          children: [
            {
              label: "Location",
              to: "location",
              icon: "map-marker-alt",
              children: [
                {
                  label: "City",
                  to: "city",
                  icon: "city",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      label: "Settings",
      to: "/settings",
      icon: "cogs",
      children: [
        {
          label: "Account",
          to: "account",
          icon: "user-cog",
        },
        {
          label: "Security",
          to: "security",
          icon: "shield-alt",
          children: [
            {
              label: "Login",
              to: "login",
              icon: "sign-in-alt",
            },
            {
              label: "Register",
              to: "register",
              icon: "user-plus",
              children: [
                {
                  label: "Random data",
                  to: "",
                  icon: "dice",
                },
              ],
            },
          ],
        },
      ],
    },
  ];
  
  export default menus;
  