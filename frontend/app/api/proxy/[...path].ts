import { BASE_URL } from '@/common/lib/constants/api';
import { getCurrentUser } from '@/lib/session';

export const dynamic = "force-dynamic";

const handler = async (req: Request) => {
    const user = await getCurrentUser();
    const accessToken = user?.access_token;
    const path = req.url?.split('/api/proxy')[1];

    if (!path) {
        return new Response(JSON.stringify({ error: 'Invalid path' }), { status: 400 });
    }

    const url = `${BASE_URL}${path}`;

    try {
        const body = req.method === "GET" ? undefined : await req.text();
        const request = new Request(url, {
            method: req.method,
            headers: {
                ...Object.fromEntries(req.headers),
                Authorization: `Bearer ${accessToken}`,
            },
            body,
        });

        const response = await fetch(request);

        // Handle 204 No Content specifically
        if (response.status === 204) {
            return new Response(null, {
                status: 204,
            });
        }

        // Attempt to parse JSON, but fall back to text if parsing fails
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        let data: any;
        try {
            data = await response.json();
        } catch (error) {
            console.error('Failed to parse JSON, reading as text.', error);
            data = await response.text();
        }

        return new Response(JSON.stringify(data), {
            status: response.status,
            headers: response.headers,
        });
    } catch (error) {
        console.error('Error:', error);
        const status = error instanceof Response ? error.status : 500;
        const message = error instanceof Response ? error.statusText : 'Internal Server Error';
        const body = error instanceof Response ? await error.text() : null;

        return new Response(JSON.stringify({
            error: message,
            body,
        }), { status });
    }
};

export { handler as DELETE, handler as GET, handler as POST, handler as PUT, handler as PATCH };