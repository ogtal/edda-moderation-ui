import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { t } from "i18next"; // or from your localization hook

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "#007BFF" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: t("home"),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t("settings"),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "settings-sharp" : "settings-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="faq"
        options={{
          title: "FAQ",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "help-circle" : "help-circle-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
}
