import { IMovies, IEpisodes, ICategories } from "@movies/interfaces";
import axios from "axios";

export class o1MoviesSerivce {
    /**
     * Lấy danh sách phim mới theo trang
     *
     * @param page Trang cần lấy
     * @returns Danh sách phim
     */
    async getByPage(page: number): Promise<IMovies[]> {
        try {
            const res = await axios.get(`https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=${page}`);
            const items = res.data?.items || [];

            const slugs: string[] = items.map((item: any) => item.slug);

            const movies: IMovies[] = await Promise.all(
                slugs.map(slug => this.getMoviesInformation(slug))
            );

            return movies;
        } catch (err) {
            throw new Error("Lỗi khi lấy danh sách phim:" + err);
        }
    }

    /**
     * Lấy thông tin chi tiết một bộ phim theo slug
     *
     * @param moviesSlug Slug của phim muốn lấy thông tin
     * @returns IMovies
     */
    async getMoviesInformation(moviesSlug: string): Promise<IMovies> {
        try {
            const res = await axios.get(`https://ophim1.com/phim/${moviesSlug}`);
            const movie = res.data?.movie;
            const episodesData = res.data?.episodes?.[0]?.server_data || [];

            const episodes: IEpisodes[] = episodesData.map((ep: any) => ({
                name: ep.name,
                m3u8: ep.link_m3u8
            }));

            const categories: ICategories[] = movie.category.map((cat: any) => ({
                id: cat.id,
                name: cat.name,
                slug: cat.slug
            }));

            const movieDetail: IMovies = {
                id: movie._id,
                name: movie.name,
                slug: movie.slug,
                originName: movie.origin_name,
                status: movie.status,
                type: movie.type,
                category: categories,
                posterUrl: movie.poster_url,
                thumbUrl: movie.thumb_url,
                episodes: episodes,
                episodeTotal: movie.episode_total,
                episodeCurrent: movie.episode_current,
                quality: movie.quality,
                createdTime: movie.created?.time || ""
            };

            return movieDetail;
        } catch (err) {
            throw new Error(`Lỗi khi lấy chi tiết phim ${moviesSlug}:` + err);
        }
    }
}
