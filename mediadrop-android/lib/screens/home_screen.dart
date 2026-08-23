import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:google_mobile_ads/google_mobile_ads.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final TextEditingController _urlController = TextEditingController();
  BannerAd? _bannerAd;
  bool _isBannerAdLoaded = false;
  String? _status;
  bool _isLoading = false;

  @override
  void initState() {
    super.initState();
    _loadBannerAd();
    _checkClipboard();
  }

  void _loadBannerAd() {
    _bannerAd = BannerAd(
      adUnitId: 'ca-app-pub-3940256099942544/6300978111', 
      request: const AdRequest(),
      size: AdSize.banner,
      listener: BannerAdListener(
        onAdLoaded: (_) => setState(() => _isBannerAdLoaded = true),
        onAdFailedToLoad: (ad, err) => ad.dispose(),
      ),
    )..load();
  }

  Future<void> _checkClipboard() async {
    final data = await Clipboard.getData(Clipboard.kTextPlain);
    if (data?.text != null) {
      final text = data!.text!;
      final valid = ['youtube.com', 'youtu.be', 'tiktok.com', 'instagram.com', 'facebook.com'];
      if (valid.any((d) => text.contains(d)) && _urlController.text.isEmpty) {
        setState(() => _urlController.text = text);
      }
    }
  }

  @override
  void dispose() {
    _urlController.dispose();
    _bannerAd?.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return Scaffold(
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: theme.brightness == Brightness.dark 
              ? [const Color(0xFF08080C), const Color(0xFF12121A)]
              : [const Color(0xFFF8F9FF), const Color(0xFFFFFFFF)],
          ),
        ),
        child: Column(
          children: [
            Expanded(
              child: CustomScrollView(
                physics: const BouncingScrollPhysics(),
                slivers: [
                  SliverAppBar.large(
                    title: const Text('Media Drop', style: TextStyle(fontWeight: FontWeight.w900, letterSpacing: -1.5)),
                    actions: [
                      IconButton(onPressed: () {}, icon: const Icon(Icons.settings_outlined)),
                      const SizedBox(width: 8),
                    ],
                  ),
                  SliverToBoxAdapter(
                    child: Padding(
                      padding: const EdgeInsets.all(20.0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.stretch,
                        children: [
                          _buildPremiumInput(colorScheme),
                          const SizedBox(height: 16),
                          _buildDownloadButton(colorScheme),
                          if (_status != null) _buildStatusArea(colorScheme),
                          const SizedBox(height: 32),
                          _buildQuickActions(colorScheme),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
            _buildBannerAdArea(),
          ],
        ),
      ),
      bottomNavigationBar: NavigationBar(
        selectedIndex: 0,
        destinations: const [
          NavigationDestination(icon: Icon(Icons.download_rounded), label: 'Download'),
          NavigationDestination(icon: Icon(Icons.history_rounded), label: 'History'),
          NavigationDestination(icon: Icon(Icons.local_library_rounded), label: 'Library'),
        ],
      ),
    );
  }

  Widget _buildPremiumInput(ColorScheme colors) {
    return Container(
      decoration: BoxDecoration(
        color: colors.surface.withOpacity(0.5),
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: colors.outlineVariant.withOpacity(0.3)),
        boxShadow: [
          BoxShadow(color: Colors.black.withOpacity(0.03), blurRadius: 20, offset: const Offset(0, 10))
        ],
      ),
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      child: Row(
        children: [
          Icon(Icons.link_rounded, color: colors.primary),
          const SizedBox(width: 12),
          Expanded(
            child: TextField(
              controller: _urlController,
              decoration: const InputDecoration(
                hintText: 'Paste web link here...',
                border: InputBorder.none,
                hintStyle: TextStyle(fontSize: 15),
              ),
            ),
          ),
          if (_urlController.text.isNotEmpty)
            IconButton(
              icon: const Icon(Icons.clear_rounded, size: 20),
              onPressed: () => setState(() => _urlController.clear()),
            ),
        ],
      ),
    );
  }

  Widget _buildDownloadButton(ColorScheme colors) {
    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(24),
        gradient: LinearGradient(colors: [colors.primary, colors.secondary]),
        boxShadow: [
          BoxShadow(color: colors.primary.withOpacity(0.3), blurRadius: 15, offset: const Offset(0, 8))
        ],
      ),
      child: ElevatedButton.icon(
        onPressed: _isLoading ? null : () {}, 
        icon: _isLoading ? const SizedBox(width: 20, height: 20, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2)) : const Icon(Icons.bolt_rounded),
        label: Text(_isLoading ? 'PROCESS...' : 'FETCH & DOWNLOAD', style: const TextStyle(fontWeight: FontWeight.bold, letterSpacing: 0.5)),
        style: ElevatedButton.styleFrom(
          backgroundColor: Colors.transparent,
          foregroundColor: Colors.white,
          shadowColor: Colors.transparent,
          minimumSize: const Size.fromHeight(64),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
        ),
      ),
    );
  }

  Widget _buildStatusArea(ColorScheme colors) {
    return Padding(
      padding: const EdgeInsets.only(top: 24),
      child: Container(
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(
          color: colors.primaryContainer.withOpacity(0.2),
          borderRadius: BorderRadius.circular(24),
          border: Border.all(color: colors.primaryContainer.withOpacity(0.5)),
        ),
        child: Column(
          children: [
            Row(
              children: [
                const Icon(Icons.download_rounded, size: 20),
                const SizedBox(width: 12),
                Expanded(child: Text(_status!, style: TextStyle(color: colors.onSurfaceVariant, fontSize: 13, fontFamily: 'monospace'))),
              ],
            ),
            const SizedBox(height: 12),
            LinearProgressIndicator(borderRadius: BorderRadius.circular(4)),
          ],
        ),
      ),
    );
  }

  Widget _buildQuickActions(ColorScheme colors) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text('Quick Actions', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),
        const SizedBox(height: 16),
        GridView.count(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          crossAxisCount: 2,
          mainAxisSpacing: 12,
          crossAxisSpacing: 12,
          childAspectRatio: 2.2,
          children: [
            _actionCard(Icons.slow_motion_video_rounded, 'High Res', colors),
            _actionCard(Icons.audiotrack_rounded, 'MP3 Only', colors),
            _actionCard(Icons.subtitles_rounded, 'Subtitles', colors),
            _actionCard(Icons.playlist_play_rounded, 'Playlist', colors),
          ],
        ),
      ],
    );
  }

  Widget _actionCard(IconData icon, String label, ColorScheme colors) {
    return Container(
      decoration: BoxDecoration(
        color: colors.surfaceContainerHigh,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: colors.outlineVariant.withOpacity(0.2)),
      ),
      child: InkWell(
        onTap: () {},
        borderRadius: BorderRadius.circular(20),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(icon, size: 20, color: colors.primary),
            const SizedBox(width: 8),
            Text(label, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 13)),
          ],
        ),
      ),
    );
  }

  Widget _buildBannerAdArea() {
    if (!_isBannerAdLoaded || _bannerAd == null) return const SizedBox.shrink();
    return SafeArea(
      top: false,
      child: Container(
        width: _bannerAd!.size.width.toDouble(),
        height: _bannerAd!.size.height.toDouble(),
        alignment: Alignment.center,
        child: AdWidget(ad: _bannerAd!),
      ),
    );
  }
}
