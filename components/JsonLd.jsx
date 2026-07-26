/**
 * Renders structured data. Server component — the JSON is in the HTML, so
 * crawlers see it without executing anything.
 */
export default function JsonLd({ data }) {
    const payload = Array.isArray(data) ? data : [data];

    return (
        <>
            {payload.filter(Boolean).map((item, index) => (
                <script
                    key={index}
                    type="application/ld+json"
                    // Values come from local content files, never user input.
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
                />
            ))}
        </>
    );
}
