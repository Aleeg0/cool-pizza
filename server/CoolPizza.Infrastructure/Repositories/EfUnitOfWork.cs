﻿using CoolPizza.Core.Abstractions;
using CoolPizza.Infrastructure.Data;
using Microsoft.EntityFrameworkCore.Storage;

namespace CoolPizza.Infrastructure.Repositories;

public class EfUnitOfWork(ApplicationDbContext context) : IUnitOfWork
{
    private IDbContextTransaction? _transaction;
    
    public async Task BeginTransactionAsync()
    {
        _transaction = await context.Database.BeginTransactionAsync();
    }

    public async Task CommitAsync()
    {
        if (_transaction != null)
            await _transaction.CommitAsync();
    }

    public async Task RollbackAsync()
    {
        if (_transaction != null)
            await _transaction.RollbackAsync();
    }
}