import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(request: Request): Promise<Response> {
  try {
    const { searchParams } = new URL(request.url)
    const title = searchParams.get('title')

    if (!title) {
      return new Response('Missing title parameter', { status: 400 })
    }

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(to bottom right, #ffffff, #e5e5e5)',
            padding: '48px 60px',
          }}
        >
          <div
            style={{
              display: 'flex',
              maxWidth: '800px',
              fontSize: 52,
              fontWeight: 'bold',
              textAlign: 'center',
              color: '#111',
              lineHeight: 1.4,
              letterSpacing: '-0.02em',
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginTop: '60px',
              padding: '12px 24px',
              background: '#111',
              borderRadius: '12px',
            }}
          >
            <div
              style={{
                fontSize: 36,
                fontWeight: '500',
                color: '#fff',
                letterSpacing: '-0.01em',
              }}
            >
              diescake.com
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e: unknown) {
    console.error('Error generating OG image:', e)
    return new Response('Failed to generate image', { status: 500 })
  }
}
