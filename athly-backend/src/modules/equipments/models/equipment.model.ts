export class EquipmentModel {
  uuid: string;
  name: string;
  imagePath: string;
  createdAt: Date;
  updatedAt: Date;
}

export class UserEquipmentModel {
  userId: string;
  equipmentId: string;
  createdAt: Date;
  updatedAt: Date;
}
