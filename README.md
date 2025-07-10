# Audio Clips App - Readwise for Audio

A Next.js web application that allows users to save and organize their favorite audio moments, similar to Readwise but for audio content.

## 🚀 Quick Start with GitHub Codespaces

1. **Click the green "Code" button** on this repository
2. **Select "Create codespace on main"**
3. **Wait for the environment to load** (about 1-2 minutes)
4. **Install dependencies:**
   ```bash
   npm install
   ```
5. **Set up environment variables:**
   ```bash
   cp env.example .env.local
   # Edit .env.local with your Supabase credentials
   ```
6. **Start the development server:**
   ```bash
   npm run dev
   ```
7. **Open the forwarded port** in your browser

## Features

- 🎵 **Audio Player**: Upload or link to audio files and play them in the browser
- ⏱️ **Timestamp Selection**: Set start and end times while listening to create precise clips
- 💾 **Clip Library**: Save and organize all your audio clips with titles and metadata
- 🎯 **Quote of the Day**: Get a random saved clip displayed daily
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🎨 **Modern UI**: Beautiful interface built with Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Audio**: HTML5 `<audio>` element
- **Deployment**: Vercel-ready

## Setup Instructions

### 1. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to your project dashboard
3. Navigate to Settings > API to get your project URL and anon key

### 2. Create Database Table

Run this SQL in your Supabase SQL editor:

```sql
-- Create the audio_clips table
CREATE TABLE audio_clips (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  audio_url TEXT NOT NULL,
  start_time DECIMAL(10,2) NOT NULL,
  end_time DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (optional)
ALTER TABLE audio_clips ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations (for MVP)
CREATE POLICY "Allow all operations" ON audio_clips FOR ALL USING (true);
```

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Copy the example file
cp env.example .env.local

# Edit with your Supabase credentials
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Usage

### Creating Audio Clips

1. **Enter Audio URL**: Paste a direct link to an audio file (MP3, WAV, etc.)
2. **Play Audio**: Use the built-in audio player to listen to your content
3. **Set Timestamps**: 
   - Click "Set Current as Start" to mark the beginning of your clip
   - Click "Set Current as End" to mark the end of your clip
4. **Add Title**: Give your clip a descriptive title
5. **Save**: Click "Save Audio Clip" to store it in your library

### Managing Your Library

- **View All Clips**: All saved clips appear in the Clip Library section
- **Play Clips**: Click "Play Clip" to hear just the selected portion
- **Open Original**: Click "Open Audio" to access the full audio file
- **Refresh**: Use the refresh button to update the library

### Quote of the Day

- A random clip is displayed daily in the "Quote of the Day" section
- Click "New Quote" to get a different random clip
- Click "Play Quote" to hear the selected clip

## API Endpoints

- `GET /api/clips` - Retrieve all audio clips
- `POST /api/clips` - Create a new audio clip
- `GET /api/clips/random` - Get a random audio clip

## Project Structure

```
audio-clips-app/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── clips/
│   │   │       ├── route.ts
│   │   │       └── random/
│   │   │           └── route.ts
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── AudioPlayer.tsx
│   │   ├── ClipLibrary.tsx
│   │   └── QuoteOfTheDay.tsx
│   └── lib/
│       └── supabase.ts
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this project for your own purposes!

## Support

If you encounter any issues:
1. Check that your Supabase credentials are correct
2. Ensure the database table was created properly
3. Verify your audio URLs are accessible
4. Check the browser console for any errors

## Future Enhancements

- User authentication and personal clip libraries
- Audio file upload support
- Transcription and search functionality
- Social sharing features
- Mobile app version
- Integration with podcast platforms 