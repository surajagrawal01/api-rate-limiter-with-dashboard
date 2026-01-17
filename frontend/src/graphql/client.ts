const GRAPHQL_ENDPOINT = "http://localhost:8002/graphql";

type GraphQLResponse<T> = {
    data?: T;
    errors?: { message: string }[];
};

export async function graphqlClient<T>(
    query: string,
    variables?: Record<string, any>
): Promise<T> {
    const res = await fetch(GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query,
            variables,
        }),
        cache: "no-store", // important for App Router
    });

    const json: GraphQLResponse<T> = await res.json();
    if (json?.errors) {
        throw new Error(json.errors[0].message)
    }

    return json.data;
}