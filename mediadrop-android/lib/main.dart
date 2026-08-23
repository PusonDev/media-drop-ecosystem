import 'package:flutter/material.dart';
import 'package:google_mobile_ads/google_mobile_ads.dart';
import 'screens/home_screen.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  MobileAds.instance.initialize();
  runApp(const MediaDropApp());
}

class MediaDropApp extends StatelessWidget {
  const MediaDropApp({super.key});

  @override
  Widget build(BuildContext context) {
    const Color accentColor = Color(0xFF6C63FF);
    
    return MaterialApp(
      title: 'Media Drop',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        brightness: Brightness.light,
        colorSchemeSeed: accentColor,
        scaffoldBackgroundColor: const Color(0xFFF8F9FF),
        appBarTheme: const AppBarTheme(
          backgroundColor: Colors.transparent,
          elevation: 0,
          centerTitle: true,
        ),
      ),
      darkTheme: ThemeData(
        useMaterial3: true,
        brightness: Brightness.dark,
        colorSchemeSeed: accentColor,
        scaffoldBackgroundColor: const Color(0xFF08080C),
        surface: const Color(0xFF12121A),
        appBarTheme: const AppBarTheme(
          backgroundColor: Colors.transparent,
          elevation: 0,
          centerTitle: true,
        ),
      ),
      themeMode: ThemeMode.system,
      home: const HomeScreen(),
    );
  }
}
