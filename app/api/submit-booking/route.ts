export async function POST(request: Request) {
  try {
    const body = await request.json();
    const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID || 'xojbpjde';
    
    console.log('[v0] Submitting to Formspree ID:', formspreeId);
    console.log('[v0] Form data:', { name: body.name, phone: body.phone, theme: body.theme });
    
    // Forward to Formspree with proper JSON format
    const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        _subject: body._subject || 'New Theme Booking',
        _replyto: body._replyto || 'nithishjayaraj17@gmail.com',
        name: body.name,
        phone: body.phone,
        theme: body.theme,
        reference_image: body.reference_image,
      }),
    });

    console.log('[v0] Formspree response status:', response.status);

    if (!response.ok) {
      const errorData = await response.text();
      console.error('[v0] Formspree error:', errorData);
      return Response.json(
        { success: false, message: `Formspree error: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('[v0] Formspree success:', data);

    return Response.json({ 
      success: true, 
      message: 'Booking submitted successfully!',
      data: data
    });
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error('[v0] API error:', errorMsg);
    return Response.json(
      { success: false, message: `Server error: ${errorMsg}` },
      { status: 500 }
    );
  }
}
