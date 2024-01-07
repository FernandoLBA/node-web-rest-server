export class UpdateTodoDto {
  private constructor(
    public readonly id: number,
    public readonly text: string,
    public readonly completedAt?: Date
  ) {}

  get values() {
    const returnObj: { [key: string]: any } = {};

    if (this.text) returnObj.text = this.text;
    if (this.completedAt) returnObj.completedAt = this.completedAt;

    return returnObj;
  }

  /**
   *  Aquí se hará un dto para una actualización opcional, es decir,
   * se actualiza el text o el completedAt o ambos
   */
  static update = (props: {
    [key: string]: any;
  }): [string?, UpdateTodoDto?] => {
    const { id, text, completedAt } = props;
    let newCompletedAt = completedAt;

    // * Si no viene el id o no es de tipo number
    if (!id || isNaN(Number(id)))
      return ["Id must be a valid number", undefined];

    // * Revisa que el tipado sea válido
    if (completedAt) {
      newCompletedAt = new Date(completedAt);

      if (newCompletedAt.toString() === "Invalid Date") {
        return ["CompletedAt must be a valid date", undefined];
      }
    }

    return [undefined, new UpdateTodoDto(id, text, newCompletedAt)];
  };
}
