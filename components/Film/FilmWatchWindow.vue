<template>
    <div class="flex flex-col items-center justify-center">
        <div class="flex flex-row gap-10 items-start">
            <FilmDescriptionPoster />
            <div class="flex flex-col gap-1">
                <FilmDescriptionTitle />
                <FilmDescriptionRating />
                <FilmDescriptionYearFrom />
                <FilmDescriptionGenre />
                <FilmDescriptionCountry />
                <FilmDescriptionDirector />
                <FilmDescriptionActor />
                <FilmDescriptionSelection />
                <FilmScreenshotSpoiler />
                <FilmDescriptionDescription />
            </div>
        </div>
        <FilmPlayerWidget class="mt-10"></FilmPlayerWidget>
    </div>
</template>