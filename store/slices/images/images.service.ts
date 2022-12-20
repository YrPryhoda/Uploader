class ImagesService {
  private readonly url: string;

  constructor() {
    this.url = `${process.env.ABS_URL}/api/image`;
  }

  async getUsersImages(
    id: number,
    page: number
  ): Promise<{ rows: number; images: IImage[] }> {
    const response = await fetch(`${this.url}/user/${id}?page=${page}`);

    if (!response.ok) {
      throw Error(response.statusText);
    }

    return await response.json();
  }

  async create(images: FormData): Promise<{ data: IImage[] } | never> {
    const response = await fetch("/api/image", {
      method: "POST",
      credentials: "include",
      body: images
    });

    if (!response.ok) {
      throw Error(response.statusText);
    }
    return await response.json();
  }

  async delete(id: number): Promise<IImage | never> {
    const response = await fetch(`/api/image/${id}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw Error(response.statusText);
    }
    return await response.json();
  }

  async getByCoordinates(options: IGeo & { page: number }) {
    const response = await fetch(
      `/api/coordinates?lat=${options.lat}&lng=${options.lng}&page=${options.page}`
    );

    if (!response.ok) {
      throw Error(response.statusText);
    }

    return await response.json();
  }

  async imageLike(options: { imageId: number }) {
    const response = await fetch(`/api/reaction/${options.imageId}`);

    if (!response.ok) {
      throw Error(response.statusText);
    }

    return await response.json();
  }
}

export default new ImagesService();

