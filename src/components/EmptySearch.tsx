const EmptySearch = () => {
    return (
        <div className="flex flex-col items-center justify-center py-20">
            <svg
                className="w-16 h-16 text-gray-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
            </svg>
            <h2 className="text-xl font-semibold text-gray-700">No encontramos resultados para tu búsqueda :(</h2>
            <p className="text-gray-500 mt-2">Intenta ajustar tu búsqueda o filtro para encontrar lo que estás buscando.</p>
        </div>
    );
}

export default EmptySearch;