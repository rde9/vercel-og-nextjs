import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

// Make sure the font exists in the specified path:
const font = fetch(new URL('../../assets/Inter-Medium.ttf', import.meta.url)).then(
  (res) => res.arrayBuffer(),
);

export default async function (req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const fontData = await font;

    // ?title=<title>
    const hasTitle = searchParams.has('title');
    const title = hasTitle
      ? searchParams.get('title')?.slice(0, 100)
      : '';

    return new ImageResponse(
      (
        // Modified based on https://tailwindui.com/components/marketing/sections/cta-sections
      <div
        style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fdf1f0',
          fontSize: 60,
          fontFamily: '"Inter"',
          letterSpacing: -2,
          fontWeight: 700,
          textAlign: 'center',
        }}
        >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundImage: 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          <svg width="56px" height="56px" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="iconify iconify--twemoji" preserveAspectRatio="xMidYMid meet"><path fill="#F4ABBA" d="M34.193 13.329a5.975 5.975 0 0 0 1.019-1.28c1.686-2.854.27-10.292-.592-10.8c-.695-.411-5.529 1.05-8.246 3.132C23.876 2.884 21.031 2 18 2c-3.021 0-5.856.879-8.349 2.367C6.93 2.293 2.119.839 1.424 1.249c-.861.508-2.276 7.947-.592 10.8c.278.471.615.884.989 1.249C.666 15.85 0 18.64 0 21.479C0 31.468 8.011 34 18 34s18-2.532 18-12.521c0-2.828-.66-5.606-1.807-8.15z"></path><path fill="#EA596E" d="M7.398 5.965c-2.166-1.267-4.402-2.08-4.8-1.845c-.57.337-1.083 4.998-.352 8.265a20.365 20.365 0 0 1 5.152-6.42zm26.355 6.419c.733-3.267.219-7.928-.351-8.265c-.398-.235-2.635.578-4.801 1.845a20.345 20.345 0 0 1 5.152 6.42zM28 23.125c0 4.487-3.097 9.375-10 9.375c-6.904 0-10-4.888-10-9.375S11.096 17.5 18 17.5c6.903 0 10 1.138 10 5.625z"></path><path fill="#662113" d="M15 24.6c0 1.857-.34 2.4-1.5 2.4s-1.5-.543-1.5-2.4c0-1.856.34-2.399 1.5-2.399s1.5.542 1.5 2.399zm9 0c0 1.857-.34 2.4-1.5 2.4s-1.5-.543-1.5-2.4c0-1.856.34-2.399 1.5-2.399s1.5.542 1.5 2.399z"></path><circle fill="#292F33" cx="7" cy="17" r="2"></circle><circle fill="#292F33" cx="29" cy="17" r="2"></circle></svg>
          <span style={{
            marginLeft: '7px',
          }}
          >
            PoRC {title}
          </span>
        </div>
      </div>
      ),
      {
        width: 800,
        height: 400,
        fonts: [
          {
            name: 'Inter',
            data: fontData,
            style: 'normal',
          },
        ]
      },
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}