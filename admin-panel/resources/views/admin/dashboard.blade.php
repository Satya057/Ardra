<!DOCTYPE html>
<html>
<head>
    <title>Admin Dashboard</title>
</head>
<body>
    <h1>Admin Dashboard</h1>
    <form method="POST" action="{{ route('admin.logout') }}">
        @csrf
        <button type="submit">Logout</button>
    </form>

    <h2>Form Entries</h2>
    <table>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <!-- Add other columns as needed -->
        </tr>
        @foreach($entries as $entry)
        <tr>
            <td>{{ $entry->id }}</td>
            <td>{{ $entry->name }}</td>
            <td>{{ $entry->email }}</td>
            <!-- Add other columns as needed -->
        </tr>
        @endforeach
    </table>
</body>
</html>
