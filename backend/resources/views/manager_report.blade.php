<!DOCTYPE html>
<html>
<head>
    <title>Manager Report</title>
    <style>
        * {
        }
        table {
            width: 100%;
            border: 1px solid black;
        }
        
        th, td {
            border: 1px solid black;
            font-size: 0.75rem;
            text-align: center;
            max-width: 60px; /* Adjust as needed */
            overflow: hidden;
            text-overflow: ellipsis; /* Show ellipsis for overflowed text */
            white-space: nowrap;
        }
        
        .title {
            width: 100%;
            display: flex;
            flex-direction: row;
            gap: 1rem;
            margin-bottom: 1rem;
        }
    </style>

</head>
<body>

<div class="title">
    <h1>Manager Report</h1>
    @if($startDate && $endDate)
        <p>Date Range: {{ $startDate }} to {{ $endDate }}</p>
    @endif
</div>

<h2>Assigned Products - {{ count($tableDataAssigned) }}</h2>

<table>
    <thead>
    <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Category</th>
        <th>Amount</th>
        <th>Dest. Shelf</th>
        <th>Asignee</th>
        <th>Status</th>
        <th>Suppl. Name</th>
        <th>Suppl. Price</th>
        <th>Store Price</th>
        <th>Created</th>
        <!-- Add more columns as needed -->
    </tr>
    </thead>
    <tbody>
    @foreach($tableDataAssigned as $row)
        <tr>
            <td>{{ $row->id }}</td>
            <td>{{ $row->name }}</td>
            <td>{{ $row->category }}</td>
            <td>{{ $row->quantity }}</td>
            <td>{{ $row->destination_shelf }}</td>
            <td>{{ $row->asignee_id }}</td>
            <td>
                @if($row->delivered == 0)
                    Warehouse
                @elseif($row->delivered == 1)
                    In Shelf
                @else
                    <!-- Handle other cases if needed -->
                    Unknown Status
                @endif
            </td>
            <td>{{ $row->supplier_name }}</td>
            <td>{{ $row->supplier_price }}</td>
            <td>{{ $row->store_price }}</td>
            <td>{{ $row->formatted_created_at }}</td>
            <!-- Add more columns as needed -->
        </tr>
    @endforeach
    </tbody>
</table>

<h2>Unassigned Products - {{ count($tableDataUnassigned) }}</h2>

<table>
    <thead>
    <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Category</th>
        <th>Amount</th>
        <th>Dest. Shelf</th>
        <th>Status</th>
        <th>Suppl. Name</th>
        <th>Suppl. Price</th>
        <th>Store Price</th>
        <th>Created</th>
        <!-- Add more columns as needed -->
    </tr>
    </thead>
    <tbody>
    @foreach($tableDataUnassigned as $row)
        <tr>
            <td>{{ $row->id }}</td>
            <td>{{ $row->name }}</td>
            <td>{{ $row->category }}</td>
            <td>{{ $row->quantity }}</td>
            <td>{{ $row->destination_shelf }}</td>
            <td>
                @if($row->delivered == 0)
                    Warehouse
                @elseif($row->delivered == 1)
                    In Shelf
                @else
                    <!-- Handle other cases if needed -->
                    Unknown Status
                @endif
            </td>
            <td>{{ $row->supplier_name }}</td>
            <td>{{ $row->supplier_price }}</td>
            <td>{{ $row->store_price }}</td>
            <td>{{ $row->formatted_created_at }}</td>
            <!-- Add more columns as needed -->
        </tr>
    @endforeach
    </tbody>
</table>

<h2>Workers - {{ count($userData) }}</h2>

<table>
    <thead>
    <tr>
        <th>ID</th>
        <th>Username</th>
        <th>Role</th>
        <th>Assigned Products</th>
        <th>Delivered Products</th>
        <th>Created At</th>
        <!-- Add more columns as needed -->
    </tr>
    </thead>
    <tbody>
    @foreach($userData as $user)
        <tr>
            <td>{{ $user->id }}</td>
            <td>{{ $user->username }}</td>
            <td>{{ $user->role }}</td>
            <td>{{ $user->assignedProductsCount }}</td>
            <td>{{ $user->deliveredProductsCount }}</td>
            <td>{{ $user->formatted_created_at }}</td>
            <!-- Add more columns as needed -->
        </tr>
    @endforeach
    </tbody>
</table>

</body>
</html>
