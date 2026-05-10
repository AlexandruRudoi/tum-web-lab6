namespace Salon.Domain.Permissions;

/// <summary>Fine-grained permission strings embedded as JWT claims.</summary>
public static class AppPermission
{
    /// <summary>Create, update, delete services / products / news items.</summary>
    public const string ManageContent = "content:manage";

    /// <summary>View, confirm, and decline client appointments.</summary>
    public const string ManageAppointments = "appointments:manage";

    /// <summary>List, update roles, and delete staff accounts.</summary>
    public const string ManageUsers = "users:manage";

    /// <summary>Maps a role name to its set of permissions.</summary>
    public static IReadOnlyList<string> ForRole(string role) => role switch
    {
        "ADMIN"   => [ManageContent, ManageAppointments, ManageUsers],
        "MANAGER" => [ManageAppointments],
        _         => []           // VISITOR / USER
    };
}
