import cloudscraper from 'cloudscraper';
import { options } from '../constants';
import { ChapterData } from '../interfaces';
import { load } from 'cheerio';

export async function getLatest(): Promise<ChapterData[]> {
    try {

        options.uri = 'https://latanime.org/';

        const chaptersData = (await cloudscraper(options)) as string;
        const $ = load(chaptersData);

        let chapters: ChapterData[] = []
        if($('.col-6.col-md-6.col-lg-3.mb-3').length > 0){
            $('.col-6.col-md-6.col-lg-3.mb-3').each((i, el) => {
                chapters.push({
                    title: $(el).find('h2').text().split(" - ")[1],
                    chapter: Number($(el).find('h2').text().split(" - ")[0]),
                    type: $(el).find('div.info_cap').children('span').text(),
                    cover: $(el).find('div.imgrec').children('img').attr('data-src') as string,
                    url: $(el).find('a').attr('href') as string
                });
            });
        }

        return chapters;

    } catch {
        return [];
    }
}