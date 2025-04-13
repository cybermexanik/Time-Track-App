interface UserData {
    id: number;
    avatarUrl?: string;
    name:string;
    surname: string;
    middlename: string;
    email:string;
    status?: string;
    role?: RoleData | null;
  }