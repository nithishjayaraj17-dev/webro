export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Forward to Formspree
    const formData = new FormData();
    formData.append('_subject', body._subject);
    formData.append('_replyto', body._replyto);
    formData.append('name', body.name);
    formData.append('phone', body.phone);
    formData.append('theme', body.theme);
    formData.append('reference_image', body.reference_image);

    const response = await fetch(`https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID || 'xojbpjde'}`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      return Response.json({ success: true, message: 'Booking submitted successfully!' });
    } else {
      return Response.json(
        { success: false, message: 'Failed to submit booking', errors: data.errors },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error('[v0] API error:', error);
    return Response.json(
      { success: false, message: 'Server error occurred' },
      { status: 500 }
    );
  }
}
