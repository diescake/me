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
            backgroundColor: '#fff',
            padding: '40px',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 60,
              fontWeight: 'bold',
              textAlign: 'center',
              color: '#000',
              lineHeight: 1.4,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 40,
              color: '#666',
              marginTop: 'auto',
            }}
          >
            diescake.com
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
