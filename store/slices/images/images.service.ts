class ImagesService {
  private readonly url: string;

  constructor() {
    this.url = `${process.env.ABS_URL}/api/image`;
  }

  async getUsersImages(id: number): Promise<{ data: IImage[] }> {
    const response = await fetch(`${this.url}/user/${id}`);

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
}

export default new ImagesService();

